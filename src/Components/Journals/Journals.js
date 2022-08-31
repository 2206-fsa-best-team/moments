import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../server/supabaseClient";
import { VStack, Text, Skeleton } from "@chakra-ui/react";
import FloatingAdd from "../Buttons/FloatingAdd";
import JournalEntryCard from "./JournalEntryCard";

const Journals = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = "journal";

  useEffect(() => {
    fetchJournals();
  }, []);

  async function fetchJournals() {
    // setLoading(true);
    try {
      const { data, error } = await supabase
        .from("journals")
        .select()
        .order("date", { ascending: false });
      if (error) throw error;
      setJournals(data);
    } catch (error) {
      console.error(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }

  const navToJournalEntry = (id) => {
    navigate(`/journals/${id}`);
  };

  return (
    <>
      <Text ml="1rem" fontSize={"1.5rem"} pl="4" pt="1rem">
        your journal entries
      </Text>
      {loading ? (
        <VStack
          p="1rem"
          m="16px"
          spacing="1rem"
          borderRadius="lg"
          alignItems="stretch"
          maxW="700px"
        >
          {journals.map((journal) => (
            <Skeleton height="100px" />
          ))}
        </VStack>
      ) : (
        <>
          {!journals.length ? (
            <Text ml="1rem" fontSize={"1rem"} pl="1rem" pt="1rem">
              add a new entry using the plus button.
            </Text>
          ) : (
            <VStack p="1rem" spacing="1rem" alignItems="stretch">
              {journals.map((journal) => (
                <JournalEntryCard
                  key={journal.id}
                  loading={loading}
                  journalEntry={journal}
                  onClick={() => navToJournalEntry(journal.id)}
                />
              ))}
            </VStack>
          )}
          <FloatingAdd location={location} />
        </>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Journals;
