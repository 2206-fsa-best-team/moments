import React, { useState } from "react";
import { supabase } from "../../server/supabaseClient";
import { useNavigate } from "react-router-dom";
import MoodSlider from "../Buttons/Slider";
import {
  Stack,
  Button,
  Textarea,
  Text,
  CircularProgress,
} from "@chakra-ui/react";

const AddMoment = () => {
  const [moment, setMoment] = useState({ content: "" });
  const [count, setCount] = useState(moment.content.length);
  const { content } = moment;
  const [submitLoading, setSubmitLoading] = useState(false);
  let navigate = useNavigate();
  const user = supabase.auth.user();
  const [sliderValue, setSliderValue] = useState(50);
  const handleChange = (evt) => {
    setCount(evt.target.value.length);
  };

  async function createMoment() {
    setSubmitLoading(true);
    try {
      if (!content.length) {
        alert("write about your moment");
      } else {
        await supabase
          .from("moments")
          .insert({ content, vibe: sliderValue, user_id: user.id })
          .single();
        setMoment({ content: "" });
        navigate("/moments");
      }
      setSubmitLoading(false);
    } catch (error) {
      console.error(error);
      setSubmitLoading(false);
      throw error;
    }
  }

  return (
    <>
      <Stack px="24px" display="flex">
        <Text pb="16px" mt="32px" ml="8px" fontSize={"24px"}>
          how's your moment?
        </Text>
        <Textarea
          resize={"none"}
          placeholder="write about your moment here"
          value={content}
          onChange={(evt) => {
            setMoment({ ...moment, content: evt.target.value });
            handleChange(evt);
          }}
          maxLength={260}
        />
        <Text fontSize="0.75rem" color="gray" w="100%" align="right" pr="16px">
          {count}/260
        </Text>
        <MoodSlider sliderValue={sliderValue} setSliderValue={setSliderValue} />
        {submitLoading ? (
          <CircularProgress
            isIndeterminate
            size="1.75rem"
            color="tomato"
            align="center"
          />
        ) : (
          <>
            <Button onClick={createMoment} colorScheme="teal">
              add this moment
            </Button>
          </>
        )}
      </Stack>
    </>
  );
};
export default AddMoment;

// redux for getting the slider state
