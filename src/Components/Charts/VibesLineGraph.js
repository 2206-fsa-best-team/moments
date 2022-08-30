import React from "react";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  Label,
} from "recharts";
import { Box, Container, Text, useColorModeValue } from "@chakra-ui/react";
import { findMoment } from "../Helpers/findMoment";

const VibesLineGraph = (props) => {
  const {setEntryId, setMoment} = props

  const dataType = (props) => {
    if (props.type === "moments") {
      const { moments } = props;
      return moments;
    } else if (props.type === "journals") {
      const { journals } = props
      return journals;
    }
  };

  const CustomTooltip = (data) => {
    const { payload, label, active, color, content } = data
    if (active) {
      content.props.setEntryId(payload[0].payload.id)
      content.props.setMoment(findMoment(dataType(props), payload[0].payload.id))
      return (
        <Box
          h={"28px"}
          w={"72px"}
          border="1px"
          borderRadius={"xl"}
          bg={color}
          borderColor={"black"}

        >
          <Text>{`vibe: ${payload[0].value}`}</Text>
        </Box>
      );
    }
    return null;
  };

  return (
    <>
      <Container >
        <Text align="left" fontSize={"lg"}>
          vibe
        </Text>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart
            margin={{
              top: 5,
              right: 30,
              left: 30,
            }}
            data={dataType(props)}
          >
            <Line
              type="monotone"
              dataKey={"vibe"}
              stroke={'tomato'}
              dot={true}
              fill={"tomato"}
              activeDot={{ r: 6 }}
            />
            <Tooltip
              content={
                <CustomTooltip color={useColorModeValue("white", "tomato")} setEntryId={setEntryId} setMoment={setMoment}/>
              }

            />
            <XAxis
              label={
                <Label
                  value="time"
                  fill={useColorModeValue("black", "white")}
                  fontSize="18"
                />
              }
              fontSize={0}
              tickLine={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Container>
    </>
  );
};

export default VibesLineGraph;
