"use client"

import Image from 'next/image'
import { useState } from 'react'
import { PT_Serif, PT_Sans, Roboto_Mono } from 'next/font/google'
import { ActionIcon, Container, Divider, Flex, Switch, Text, TextInput } from '@mantine/core'
import Colours from "../colours";

const serif = PT_Serif({ subsets: ['latin'], weight: "400" });
const sans = PT_Sans({ subsets: ['latin'], weight: "400" });
const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: "400" });

export default function Home() {
  const [fontFamily, setFontFamily] = useState<{
    label: "Serif" | "Sans Serif" | "Roboto Mono",
    value: any
  }>({ label: "Serif", value: serif});
  return (
    <Container className={fontFamily.value}
      sx={{
        padding: "30px"
      }}
    >
      <header>
        <Flex
          justify="space-between"
          align="center"
        >
          <Image
            src="/book.png"
            width={50}
            height={50}
            alt="logo"
          />
          <Flex
            gap={20}>
            <Flex
              align="center"
              gap={5}
            >
              <Text>{fontFamily.label}</Text>
              <ActionIcon>
                <Image
                  src="/icons/dropdown.svg"
                  width={20}
                  height={20}
                  alt="dropdown"
                />
              </ActionIcon>
            </Flex>
            <Divider orientation='vertical' />
            <Flex
              align="center"
              gap={5}
            >
              <Switch />
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
              placeholder='Search a word'
              rightSection={
                <ActionIcon>
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
              >
                hello
              </Text>
              <Text
                size={16}
              >
                həˈləʊ
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
                alt="dropdown"
              />
            </ActionIcon>
          </Flex>
        </Flex>
      </main>
    </Container>
  )
}
