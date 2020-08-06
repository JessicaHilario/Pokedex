import React from "react";
import {
  Dropdown,
  ShorthandValue,
  DropdownItemProps,
} from "@fluentui/react-northstar";

export const MultipleSelection: React.FunctionComponent<MultipleSelectionProps> = (
  props
) => {
  const { options } = props;
  const getA11ySelectionMessage = {
    onAdd: (item: any) => `${item} has been selected.`,
    onRemove: (item: any) => `${item} has been removed.`,
  };

  return (
    <Dropdown
      multiple
      items={options}
      getA11ySelectionMessage={getA11ySelectionMessage}
    />
  );
};

interface MultipleSelectionProps {
  options: string[];
}
