import { ComponentMeta, Story } from "@storybook/react";
import Component from ".";
import StoryWrapper from "../../utils/stories/StoryWrapper";
import { switchArgsTypes } from "./helper";
import { IToggleProps } from "./types";

const story: ComponentMeta<any> = {
  title: `Common Component/Toggle`,
  component: Component,
};
export default story;

const Template: Story<IToggleProps> = (args) => (
  <StoryWrapper>
    <Component {...args} />
  </StoryWrapper>
);

export const Switch = Template.bind({});

Switch.argTypes = switchArgsTypes;

Switch.args = {
  status: true,
  label: "Remember Password",
  size: `md`,
  color: "primary",
  disabled: false,
};

export const Example: Story<IToggleProps> = () => (
  <StoryWrapper>
    <Component color="primary" size="lg" label="Primary" status={true} />
    <Component color="secondary" size="md" status={true} label="secondary" />
    <Component color="accent" size="sm" status={true} label="accent" />
    <Component color="normal" size="xs" status={true} />
  </StoryWrapper>
);
