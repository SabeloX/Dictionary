"use client"

import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from 'react'
import { PT_Serif, PT_Sans, Roboto_Mono, Pangolin } from 'next/font/google'
import { ActionIcon, Container, Divider, Flex, List, Popover, Switch, Text, TextInput } from '@mantine/core'
import Colours from "../colours";
import { NextFont } from 'next/dist/compiled/@next/font'
import styles from "./page.module.css";
import axios from 'axios'

const serif = PT_Serif({ subsets: ['latin'], weight: "400" });
const sans = PT_Sans({ subsets: ['latin'], weight: "400" });
const robotoMono = Roboto_Mono({ subsets: ['latin'] });
const pangolin = Pangolin({ subsets: ['latin'], weight: "400" });

type FontType = {
  label: "Serif" | "Sans Serif" | "Roboto Mono" | "Pangolin";
  value: NextFont;
}

const fonts: FontType[] = [
  {
    label: "Serif",
    value: serif
  },
  {
    label: "Sans Serif",
    value: sans
  },
  {
    label: "Roboto Mono",
    value: robotoMono
  },
  {
    label: "Pangolin",
    value: pangolin
  },
]
type Definition = {
  antonyms: string[];
  synonyms: string[];
  definition: string;
}

type Meaning = {
  antonyms: string[],
  synonyms: string[];
  partOfSpeech: string;
  definitions: Definition[];
}

type Phonetic = {
  text: string;
  audio: string;
}

type Words = {
  meanings: Meaning[];
  phonetics: Phonetic[];
  sourceUrls: string[];
  word: string;
}

type ErrorType = {
  message: string;
  solution: string;
  title: string;
}

export default function Home() {
  const [fontFamily, setFontFamily] = useState<FontType>({ label: "Roboto Mono", value: robotoMono });
  const [open, setOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [word, setWord] = useState<string>("");
  const [words, setWords] = useState<Words[]>([]);
  const [error, setError] = useState<ErrorType | null>(null);
  useEffect(() => {console.log(words, error)} ,[words])
  const getResults = async () => {
    try {
      if (word !== "") {
        const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const results = res.data;
        setWords(res.data);
        // setWords(results.map((item: any) => {
        //   return {
        //     phonetic: item.phonetics[0].map((item: any) => {
        //       return {
        //         audio: item.audio,
        //         text: item.text
        //       }
        //     }),
        //     meanings: item.meanings,
        //     sourceUrls: item.sourceUrls,
        //     word: item.word
        //   }
        // }));
      }
    }
    catch (error: any) {
      if (error.code === "ERR_BAD_REQUEST"){
        setError(error.response.data as ErrorType)
      }
    }
  }
  return (
    <Container
      className={fontFamily.value.className}
      sx={{
        padding: "30px"
      }}
      size="md"
    >
      <header>
        <Flex
          justify="space-between"
          align="center"
        >
          <Image
            src="/book.png"
            width={80}
            height={80}
            alt="logo"
          />
          <Flex
            gap={30}
          >
            <Flex
              align="center"
              gap={5}
            >
              <Text
                weight={600}
                className={fontFamily.value.className}
              >
                {fontFamily.label}
              </Text>
              <Popover
                opened={open}
                onClose={() => setOpen(false)}
              >
                <Popover.Target>
                  <ActionIcon
                    onClick={() => setOpen(open => !open)}
                  >
                    <Image
                      src="/icons/dropdown.svg"
                      width={20}
                      height={20}
                      alt="dropdown"
                    />
                  </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown>
                  <List
                    listStyleType="none"
                  >
                    <Flex
                      direction="column"
                      gap={7}
                    >
                      {
                        fonts.map((font, index) => (
                          <List.Item
                            key={index}
                            sx={{
                              "&:hover": {
                                cursor: "pointer",
                              },
                              padding: "3px"
                            }}
                            onClick={() => {
                              setFontFamily(font);
                              setOpen(false);
                            }}
                          >
                            <Text
                              size={14}
                              className={fontFamily.value.className}
                            >
                              {font.label}
                            </Text>
                          </List.Item>
                        ))
                      }
                    </Flex>
                  </List>
                </Popover.Dropdown>
              </Popover>
            </Flex>
            <Divider orientation='vertical' />
            <Flex
              align="center"
              gap={5}
            >
              <Switch
                checked={theme === "dark"}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setTheme(event.currentTarget.checked ? "dark" : "light")
                }
                styles={{
                  track: {
                    backgroundColor: Colours.primary
                  }
                }}
              />
              <ActionIcon>
                <Image
                  src="/icons/dark.svg"
                  width={20}
                  height={20}
                  alt="dropdown"
                />
              </ActionIcon>
            </Flex>
          </Flex>
        </Flex>
      </header>
      <main>
        <Flex
          direction="column"
          gap={30}
        >
          <Flex
            justify="center"
          >
            <TextInput
              className={fontFamily.value.className}
              styles={{
                input: {
                  borderRadius: "20px",
                  backgroundColor: Colours.secondary,
                  border: "none",
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
          {
            words.map((word, index) => (
              <Flex
                direction="column"
                key={index}
              >
                <Flex
                  justify="space-between"
                  align="center"
                >
                  <Flex
                    direction="column"
                  >
                    <Text
                      size={24}
                      weight={600}
                      className={fontFamily.value.className}
                    >
                      { word.word }
                    </Text>
                    <Text
                      size={16}
                      className={fontFamily.value.className}
                    >
                      { word.phonetics[0].text }
                    </Text>
                  </Flex>
                  <ActionIcon
                    sx={{
                      backgroundColor: Colours.primary,
                      padding: "20px",
                      borderRadius: "50%"
                    }}
                  >
                    <Image
                      src="/icons/play.svg"
                      width={20}
                      height={20}
                      alt="play"
                    />
                  </ActionIcon>
                </Flex>
                <Flex
                  direction="column"
                  gap={50}
                >
                  {
                    word.meanings.map((meaning, index) => (
                      <Flex
                        direction="column"
                        key={index}
                      >
                        <Text
                          weight={600}
                          sx={{
                            fontStyle: "italic"
                          }}
                          className={fontFamily.value.className}
                        >
                          {meaning.partOfSpeech}
                        </Text>
                        <Text
                          sx={{
                            color: Colours.primary
                          }}
                          className={fontFamily.value.className}
                        >
                          Meaning
                        </Text>
                        <List>
                          {
                            meaning.definitions.map((definition, index) => (
                              <List.Item
                                key={index}
                              >
                                <Text
                                  className={fontFamily.value.className}
                                >
                                  {definition.definition}
                                </Text>
                              </List.Item>
                            ))
                          }
                        </List>
                      </Flex>
                    ))
                  }
                </Flex>
              </Flex>
            ))
          }
        </Flex>
      </main>
    </Container>
  )
}
