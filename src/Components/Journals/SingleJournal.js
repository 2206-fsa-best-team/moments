import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../server/supabaseClient";
import { VStack } from "@chakra-ui/react";
import FloatingDelete from "../Buttons/FloatingDelete";
import JournalEntryCard from "./JournalEntryCard";

const SingleJournal = (props) => {
  const { journalEntryId } = useParams();
  const [journalEntry, setJournalEntry] = useState({
    id: journalEntryId,
    content: "",
    vibe: null,
    created_at: Date(),
  });
  const [loading, setLoading] = useState(true);
  const location = "journal entry";
  const navigate = useNavigate();

  useEffect(() => {
    // i don't know if there will ever be props?
    if (props.journalEntry) {
      let { content, vibe, created_at } = props.journalEntry;
      initializeJournalEntry(content, vibe, created_at);
    } else {
      fetchJournalEntry();
    }
  }, []);

  function initializeJournalEntry(content, vibe, created_at) {
    setJournalEntry({
      ...journalEntry,
      content,
      vibe,
      created_at,
    });
  }

  async function fetchJournalEntry() {
    try {
      const { data, error } = await supabase
        .from("journals")
        .select()
        .eq("id", journalEntryId)
        .single();
      if (error) throw error;
      let { content, vibe, created_at } = data;
      initializeJournalEntry(content, vibe, created_at);
    } catch (error) {
      console.error(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    try {
      const { error } = await supabase
        .from("moments")
        .delete()
        .match({ id: journalEntry.id });
      if (error) throw error;
      navigate("/moments");
    } catch (error) {
      console.error(error.error_description || error.message);
    }
  }

  return (
    <VStack
      p="5"
      m="16px"
      spacing={"16px"}
      borderRadius="lg"
      alignItems="stretch"
      maxW="700px"
    >
      <JournalEntryCard
        loading={loading}
        journalEntry={journalEntry}
        setJournalEntry={setJournalEntry}
        setLoading={setLoading}
        location={location}
      />
      <FloatingDelete
        location={location}
        id={journalEntry.id}
        onClick={handleDelete}
      />
      <br />
      <br />
      <br />
    </VStack>
  );
};

export default SingleJournal;
