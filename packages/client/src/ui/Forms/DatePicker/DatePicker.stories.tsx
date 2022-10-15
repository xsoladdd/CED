import { ComponentMeta, Story } from "@storybook/react";
import Component from ".";
import { calendarArgsTypes } from "./helper";
// import { avatarArgsTypes } from "./helper";
import { IDatePickerProps } from "./types";

const story: ComponentMeta<any> = {
  title: `Common Component/Form/DatePicker`,
  component: Component,
  argTypes: calendarArgsTypes,
};
export default story;

const Template: Story<IDatePickerProps> = (args) => (
  <>
    <div>
      <Component {...args} />
    </div>
  </>
);

export const DatePicker = Template.bind({});
DatePicker.args = {
  size: "sm",
  placeholder: "Click to select date",
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
