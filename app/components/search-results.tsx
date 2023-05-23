import { ActionIcon, Flex, List, Text } from "@mantine/core"
import { FontType, Words } from "../page";
import Image from "next/image";
import colours from "@/colours";

export interface SearchResultsProps {
    words: Words[];
    fontFamily: FontType;
}

export const SearchResults = ({ words, fontFamily } : SearchResultsProps) => {
    return (
        <Flex
            direction="column"
            gap={30}
        >
            {
                words.map((word: Words, index: number) => (
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
                                backgroundColor: colours.primary,
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
                                    color: colours.primary
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
    )
}