import { ComponentMeta, Story } from "@storybook/react";
import Component from ".";
import { textAreaArgsTypes } from "./helper";
import { ITextAreaProps } from "./types";

const story: ComponentMeta<any> = {
  title: `Common Component/Form/TextArea`,
  component: Component,
  argTypes: textAreaArgsTypes,
};
export default story;

const Template: Story<ITextAreaProps> = (args) => <Component {...args} />;

export const TextArea = Template.bind({});
TextArea.args = {
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

export const Example4ResizeOff = Template.bind({});
Example4ResizeOff.args = {
  placeholder: "Ghost input",
  color: "ghost",
  isBordered: false,
  isResizable: false,
};
