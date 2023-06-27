import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";

type Props = {};

function SearchFiltersForm({}: Props) {
  return (
    <div className="container mx-auto flex w-full flex-col">
      {/* SearchTerm */}
      <Input name="searchTerm" placeholder="What are you looking for?" />
      {/* CATEGORY */}
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
      {/* Location */}
      <Input type="text" name="location" placeholder="Location" />
      {/* PRICE */}
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Price Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
      {/* RATINGS */}
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Ratings" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SearchFiltersForm;
