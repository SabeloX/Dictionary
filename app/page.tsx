"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { PT_Serif, PT_Sans, Roboto_Mono, Pangolin } from 'next/font/google'
import { ActionIcon, Container, Flex, List, Text } from '@mantine/core'
import Colours from "../colours";
import { NextFont } from 'next/dist/compiled/@next/font'
import { HeaderBar } from './components/header-bar'
import { Search } from './components/search'
import { SearchResults } from './components/search-results'

const serif = PT_Serif({ subsets: ['latin'], weight: "400" });
const sans = PT_Sans({ subsets: ['latin'], weight: "400" });
const robotoMono = Roboto_Mono({ subsets: ['latin'] });
const pangolin = Pangolin({ subsets: ['latin'], weight: "400" });

export type FontType = {
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

export type Words = {
  meanings: Meaning[];
  phonetics: Phonetic[];
  sourceUrls: string[];
  word: string;
}

export type ErrorType = {
  message: string;
  solution: string;
  title: string;
}

export default function Home() {
  const [fontFamily, setFontFamily] = useState<FontType>({ label: "Roboto Mono", value: robotoMono });
  const [words, setWords] = useState<Words[]>([]);
  const [error, setError] = useState<ErrorType | null>(null);
  useEffect(() => {console.log(words, error)} ,[words])
  return (
    <Container
      className={fontFamily.value.className}
      sx={{
        padding: "30px"
      }}
      size="md"
    >
      <HeaderBar
        fontFamily={fontFamily}
        fonts={fonts}
        setFontFamily={setFontFamily}
      />
      <main>
        <Flex
          direction="column"
          gap={30}
        >
          <Search
            setError={setError}
            fontFamily={fontFamily}
            setWords={setWords}
          />
          <SearchResults
            fontFamily={fontFamily}
            words={words}
          />
        </Flex>
      </main>
    </Container>
  )
}
