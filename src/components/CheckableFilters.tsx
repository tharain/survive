import * as React from "react";
import { Tag } from "antd";

const { CheckableTag } = Tag;

interface Props {
  list: string[];
  filters: string[];
  setFilters: (filters: string[]) => void;
}

interface OnCheckChange {
  curr: string;
  filters: string[];
  setFilters: (filters: string[]) => void;
}

const onCheckChange = ({ curr, filters, setFilters }: OnCheckChange) => (
  checked: boolean
) => {
  if (checked) {
    return setFilters([...filters, curr]);
  }
  // do not allow uncheck for now
  return filters;
};

const CheckableFilters: React.FC<Props> = ({ list, filters, setFilters }) => (
  <div>
    {list.map((l) => {
      return (
        <CheckableTag
          key={l}
          checked={filters.includes(l)}
          onChange={onCheckChange({ curr: l, filters, setFilters })}
        >
          {l}
        </CheckableTag>
      );
    })}
  </div>
);

export default CheckableFilters;
