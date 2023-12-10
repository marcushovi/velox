import { useState } from "react";
import {
  PillsInput,
  Pill,
  Combobox,
  CheckIcon,
  Group,
  useCombobox,
  Text,
  ScrollArea,
} from "@mantine/core";
import classes from "./ComboBox.module.css";

const ITEMS_LIMIT = 30;

export default function SearchableMultiSelect({ data = [], value, setValue }) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const [search, setSearch] = useState("");

  const handleValueSelect = (val) =>
    setValue((current) =>
      current.includes(val)
        ? current.filter((v) => v._id !== val._id)
        : [...current, val]
    );

  const handleValueRemove = (val) =>
    setValue((current) => current.filter((v) => v !== val));

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {data.filter((v) => v._id === item)[0].username}
    </Pill>
  ));

  const options = data
    // .filter((item) => !value.includes(item._id))
    .filter((item) => item.username.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item, index) => (
      <Combobox.Option
        value={item._id}
        key={item._id}
        className={classes.option}
        active={value.includes(item.username)}
        disabled={value.length >= ITEMS_LIMIT && !value.includes(item)}
        onMouseOver={() => combobox.selectOption(index)}
      >
        <Group gap="sm">
          {value.includes(item._id) ? <CheckIcon size={12} /> : null}
          <span>{item.username}</span>
          <Text c="dimmed">{item.email}</Text>
        </Group>
      </Combobox.Option>
    ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleValueSelect}
      withinPortal={false}
      label="Members"
    >
      <Combobox.DropdownTarget>
        <PillsInput onClick={() => combobox.openDropdown()}>
          <Pill.Group>
            {values}

            <Combobox.EventsTarget>
              <PillsInput.Field
                onClick={() => combobox.openDropdown()}
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder="Search members"
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Backspace" && search.length === 0) {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown onMouseLeave={() => combobox.resetSelectedOption()}>
        <Combobox.Options mah={200} style={{ overflowY: 'auto' }} >
            {options.length > 0 ? (
              options
            ) : (
              <Combobox.Empty>Nothing found...</Combobox.Empty>
            )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
