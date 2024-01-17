import { WebhookEvent } from '@clerk/clerk-sdk-node';
import { Router } from 'express';
import { Webhook } from 'svix';
import bodyParser from 'body-parser';
import prisma from '../lib/db.server.js';

const router = Router();

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
if (!CLERK_WEBHOOK_SECRET) {
  throw new Error('You need a CLERK_WEBHOOK_SECRET in your .env');
}
router.post('/clerk', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  // Grab the headers and body
  const headers = req.headers;
  const payload = req.body;

  // Get the Svix headers for verification
  const svix_id = headers['svix-id'] as string;
  const svix_timestamp = headers['svix-timestamp'] as string;
  const svix_signature = headers['svix-signature'] as string;

  // If there are missing Svix headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Initiate Svix
  const wh = new Webhook(CLERK_WEBHOOK_SECRET);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(JSON.stringify(payload), headers as Record<string, string>) as WebhookEvent;
  } catch (err: any) {
    // Console log and return errro
    console.log('Webhook failed to verify. Error:', err.message);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  switch (evt.type) {
    case 'user.created':
      console.log('User created:', evt.data);
      const email = evt.data.email_addresses[0].email_address;
      await prisma.user.create({
        data: {
          id: evt.data.id,
          email,
          username: evt.data.username ?? email.split('@')[0],
          email_verified: evt.data.email_addresses[0].verification?.status === 'verified',
          avatar: evt.data.image_url,
          roles: {
            connect: {
              name: 'user',
            },
          },
        },
      });
      break;
    case 'user.updated':
      console.log('User updated:', evt.data);
      break;
    default:
      console.log('Unhandled event:', evt);
      break;
  }
  res.status(200).json({ message: 'Clerk webhook received.' });
});

export default router;
