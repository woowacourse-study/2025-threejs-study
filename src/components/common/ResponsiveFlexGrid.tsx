import styled from "@emotion/styled";
import type { ComponentType } from "react";

type ResponsiveFlexGridProps<T> = {
  Component: ComponentType<T>;
  mappingData: T[];
};

const ResponsiveFlexGrid = <T extends object>({
  Component,
  mappingData,
}: ResponsiveFlexGridProps<T>) => {
  return (
    <FlexWrapper>
      {mappingData.map((data, idx) => (
        <Component key={idx} {...data} />
      ))}
    </FlexWrapper>
  );
};

export default ResponsiveFlexGrid;

const FlexWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
`;
