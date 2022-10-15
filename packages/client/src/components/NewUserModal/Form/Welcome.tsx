import React from "react";
import Wrapper from "./Wrapper";

const writeUp = `Our goal is to support artists and content creators to showcase their art and content and provide a platform for them to have a presence throughout the web. This platform not only allows you to have your company but also allows you to interact and distribute your output to people.`;

const Welcome: React.FC = ({}) => {
  return (
    <Wrapper title="Welcome to Project Locale.">
      <div className="">
        <p className="text-[16px] leading-[19.2px]">{writeUp}</p>
        <div className="w-full text-right pt-2 pr-4">
          <cite className="text-[14px] text-theme-primary-light-dominant-complimentary dark:text-theme-primary-dark-complimentary font-light relative before:content-['.'] before:text-transparent before:w-[10px] before:-ml-5 ml-5 before:pr-[15px] before:border-b-[1px] before:border-b-black dark:before:border-b-theme-primary-dark-complimentary before:absolute before:bottom-[8px]">
            Ghost Collective
          </cite>
        </div>
      </div>
    </Wrapper>
  );
};
export default Welcome;
