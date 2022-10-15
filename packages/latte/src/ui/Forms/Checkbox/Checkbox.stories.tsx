import { ComponentMeta, Story } from "@storybook/react";
import Component from ".";
import StoryWrapper from "../../../utils/stories/StoryWrapper";
import { checkBoxArgsTypes } from "./helper";
import { ICheckboxProps } from "./types";

const story: ComponentMeta<any> = {
  title: `Common Component/Form/Checkbox`,
  component: Component,
  argTypes: checkBoxArgsTypes,
};
export default story;
const Template: Story<ICheckboxProps> = (args) => (
  <>
    <StoryWrapper>
      <Component {...args} />
    </StoryWrapper>
  </>
);

export const Checkbox = Template.bind({});
Checkbox.args = {
  color: "secondary",
  checked: true,
  label: "Remember Password",
  size: "sm",
};

export const Example1 = Template.bind({});
Example1.args = {
  color: "primary",
  checked: true,
  label: "Are you happy?",
  size: "md",
};

export const Example2NoLabel = Template.bind({});
Example2NoLabel.args = {
  color: "primary",
  checked: true,
  size: "md",
};
