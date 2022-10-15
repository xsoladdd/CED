import { ComponentMeta, Story } from "@storybook/react";
import Component from ".";
import { inputArgsTypes } from "./helper";
import { IInputProps } from "./types";

const story: ComponentMeta<any> = {
  title: `Common Component/Form/Input`,
  component: Component,
  argTypes: inputArgsTypes,
};
export default story;

const Template: Story<IInputProps> = (args) => <Component {...args} />;

export const Input = Template.bind({});
Input.args = {
  placeholder: "Input text here",
  size: "sm",
};

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
