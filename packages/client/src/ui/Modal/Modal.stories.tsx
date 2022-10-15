import { ComponentMeta, Story } from "@storybook/react";
import { useState } from "react";
import { sizeVariant } from "../../helper/vars/constants";
import StoryWrapper from "../../utils/stories/StoryWrapper";
import { toEnum } from "../../utils/stories/toEnum";
import Button from "../Button";
import Text from "../Text";
import Component from "./Modal";
import { IModalProps } from "./types";
// import { modalData } from "./res";

const story: ComponentMeta<any> = {
  title: `Common Component/Modal`,
  component: Component,
};
export default story;

const Template: Story<IModalProps> = ({ ...rest }) => {
  const [status, setStatus] = useState(true);

  const handleToggle = () => setStatus((old) => !old);

  const footer = (
    <>
      <div className="flex flex-row w-full place-content-end">
        <Button size="md" onClick={() => handleToggle()}>
          Dismiss
        </Button>
      </div>
    </>
  );
  const body = (
    <>
      <Text> Something went wrong</Text>
    </>
  );

  return (
    <>
      <StoryWrapper>
        <Button onClick={() => handleToggle()}> Open Modal</Button>
        <Component
          status={status}
          footer={footer}
          handleClose={() => handleToggle()}
          {...rest}
        >
          {body}
        </Component>
      </StoryWrapper>
    </>
  );
};

export const Modal = Template.bind({});

Modal.args = {
  title: `warning!!`,
  size: `sm`,
};

Modal.argTypes = {
  size: toEnum(sizeVariant.filter((name) => name !== `xs`)),
};
