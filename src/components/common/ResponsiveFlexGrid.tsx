import styled from "@emotion/styled";
import type { ComponentType } from "react";

type ResponsiveFlexGridProps<T> = {
  RenderComponent: ComponentType<T>;
  mappingData: T[];
};

const ResponsiveFlexGrid = <T extends object>({
  RenderComponent,
  mappingData,
}: ResponsiveFlexGridProps<T>) => {
  return (
    <FlexWrapper>
      {mappingData.map((data, idx) => (
        <RenderComponent key={idx} {...data} />
      ))}
    </FlexWrapper>
  );
};

export default ResponsiveFlexGrid;

const FlexWrapper = styled.div`
  width: 100%;
  max-width: 1120px;
  display: flex;
  flex-wrap: wrap;
  gap: 64px;
  justify-content: center;
`;
