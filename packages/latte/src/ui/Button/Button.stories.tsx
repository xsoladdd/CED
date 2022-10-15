import { ComponentMeta, Story } from "@storybook/react";
import ButtonComponent from ".";
import StoryWrapper from "../../utils/stories/StoryWrapper";
import { buttonArgsTypes } from "./helper";
import { IButonProps } from "./types";

const story: ComponentMeta<any> = {
  title: `Common Component/Button`,
  component: ButtonComponent,
  argTypes: buttonArgsTypes,
};
export default story;

const Template: Story<IButonProps> = (args) => (
  <StoryWrapper>
    <ButtonComponent {...args} />
  </StoryWrapper>
);

export const Button = Template.bind({});
Button.args = {
  children: `Click me!`,
  disabled: false,
};

export const ButtonLink = Template.bind({});
ButtonLink.args = {
  children: `Click me!`,
  isLink: true,
  color: "accent",
};

export const LoadingButton = Template.bind({});
LoadingButton.args = {
  children: `Click me!`,
  isLoading: true,
};

export const OutlinedError = Template.bind({});
OutlinedError.args = {
  children: `Click me!`,
  color: "error",
  outlined: true,
};

export const ButtonGroup: Story<IButonProps> = () => (
  <StoryWrapper>
    <div className="btn-group border-[2px] border-base-300 w-fit rounded-xl">
      <ButtonComponent color="ghost">1</ButtonComponent>
      <ButtonComponent color="ghost" isActive>
        2
      </ButtonComponent>
      <ButtonComponent color="ghost">3</ButtonComponent>
      <ButtonComponent color="ghost">4</ButtonComponent>
      <ButtonComponent color="ghost">5</ButtonComponent>
    </div>
  </StoryWrapper>
);
