import { ComponentMeta, Story } from "@storybook/react";
import Component from ".";
import { selectArgsTypes } from "./helper";
import { ISelectDataArray, ISelectProps } from "./types";

const story: ComponentMeta<any> = {
  title: `Common Component/Form/Select`,
  component: Component,
  argTypes: selectArgsTypes,
};
export default story;

const mockDataset: ISelectDataArray = [
  { text: "Eat", value: "1" },
  { text: "Sleep", value: "2" },
  { text: "Code", value: "3" },
];

const Template: Story<ISelectProps> = (args) => (
  <Component data={mockDataset} {...args} />
);

export const Select = Template.bind({});

Select.args = {
  size: "sm",
};
// Input.argTypes = inputArgsTypes;

export const Example1Error = Template.bind({});
Example1Error.args = {
  placeholder: "Error Input",
  color: "error",
};

export const Example2Disabled = Template.bind({});
Example2Disabled.args = {
  placeholder: "You can't touch me",
  disabled: true,
};

export const Example3Ghost = Template.bind({});
Example3Ghost.args = {
  placeholder: "Ghost input",
  color: "ghost",
  isBordered: false,
};
