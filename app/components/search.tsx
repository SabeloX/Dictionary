import { ActionIcon, Flex, TextInput } from "@mantine/core"
import { ErrorType, FontType, Words } from "../page"
import colours from "@/colours";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import Image from "next/image";

export interface SearchProps {
    fontFamily: FontType;
    setWords: Dispatch<SetStateAction<Words[]>>;
    setError: Dispatch<SetStateAction<ErrorType | null>>;
}

export const Search = ({ fontFamily, setWords, setError } : SearchProps) => {
    const [word, setWord] = useState<string>("");
    const getResults = async () => {
        try {
          if (word !== "") {
            const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            setWords(res.data);
          }
        }
        catch (error: any) {
          if (error.code === "ERR_BAD_REQUEST"){
            setError(error.response.data as ErrorType)
          }
        }
      }
    return (
        <Flex
            justify="center"
        >
            <TextInput
              className={fontFamily.value.className}
              styles={{
                input: {
                  borderRadius: "20px",
                  backgroundColor: colours.secondary,
                  border: "none",
                  fontFamily: fontFamily.value.style.fontFamily
                }
              }}
              sx={{
                width: "100%"
              }}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setWord(event.target.value)}
              placeholder='Search a word'
              rightSection={
                <ActionIcon
                  onClick={getResults}
                >
                  <Image
                    src="/icons/search.svg"
                    width={20}
                    height={20}
                    alt="dropdown"
                  />
                </ActionIcon>
              }
            />
          </Flex>
    )
}