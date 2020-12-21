/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { axiosWithAuth } from '../../utils/AxiosWithAuth';

export default function MenuItemModal(props) {
  const { id } = useParams();

  const [formState, setFormState] = useState({
    image: '',
    name: '',
    description: '',
    price: 0,
  });

  const [errors, setErrors] = useState({
    image: '',
    name: '',
    description: '',
    price: '',
  });

  const formSchema = Yup.object().shape({
    image: Yup.string()
      .required('Image url is required')
      .url('Must be a valid url'),
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required'),
  });

  const onInputChange = (e) => {
    e.persist();
    Yup.reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: '',
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });

    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();

    // refactored for DB needs
    const dbMenuItem = {
      menu_item_photo: formState.image,
      menu_item_name: formState.name,
      menu_item_description: formState.description,
      menu_item_price: formState.price,
      truck_id: id,
    };

    formSchema.isValid(formState).then((valid) => {
      if (valid === true) {
        setErrors({
          ...errors,
          submit: '',
        });

        // NEED TO FINISH
        axiosWithAuth()
          .post(`/trucks/food/${id}`, dbMenuItem)
          .then(({ data }) => {
            closeModal();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setErrors({
          ...errors,
          submit: 'You must fill out all form fields correctly',
        });
      }
    });
  };

  const closeModal = () => {
    setFormState({
      image: '',
      name: '',
      description: '',
      price: '',
    });
    props.toggleModal();
  };

  return (
    <div isOpen={props.modal}>
      <h2>Add Menu Item</h2>
      <div>
        <form onSubmit={submit}>
          <div>
            <label htmlFor="name">
              Item Name
              <input
                className={errors.name ? 'is-invalid' : ''}
                onChange={onInputChange}
                type="text"
                id="name"
                name="name"
                value={formState.name}
              />
            </label>
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="image">
              Image
              <input
                className={errors.image ? 'is-invalid' : ''}
                onChange={onInputChange}
                type="text"
                id="image"
                name="image"
                value={formState.image}
              />
            </label>
            {errors.image && <p>{errors.image}</p>}
          </div>
          <div>
            <label htmlFor="name">
              Price
              <input
                className={errors.price ? 'is-invalid' : ''}
                onChange={onInputChange}
                type="number"
                min="0"
                step="0.01"
                id="price"
                name="price"
                value={formState.price}
              />
            </label>
            {errors.price && <p>{errors.price}</p>}
          </div>
          <div>
            <label htmlFor="name">
              Description
              <input
                className={errors.description ? 'is-invalid' : ''}
                onChange={onInputChange}
                type="textarea"
                id="description"
                name="description"
                value={formState.description}
              />
            </label>
            {errors.description && <p>{errors.description}</p>}
          </div>
          {errors.submit && (
            <p className="bg-danger p-2 mb-2" color="white">
              {errors.submit}
            </p>
          )}
          <button type="button" color="primary">
            {' '}
            Add Item
          </button>
          <button type="button" onClick={closeModal} color="secondary">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
