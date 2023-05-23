import { ActionIcon, Divider, Flex, List, Popover, Switch, Text } from "@mantine/core";
import Image from "next/image";
import { FontType } from "../page";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import colours from "@/colours";
import { useMediaQuery } from "@mantine/hooks";

export interface HeaderBarProps {
    fontFamily: FontType;
    fonts: FontType[];
    setFontFamily: Dispatch<SetStateAction<FontType>>; 
}

export const HeaderBar = ({ fontFamily, fonts, setFontFamily } : HeaderBarProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const md = useMediaQuery("min-width: 600px");
  
  return (
    <header>
      <Flex
        justify="space-between"
        align="center"
      >
        <Flex
          gap={20}
          align="center"
        >
          <Image
            src="/book.png"
            width={80}
            height={80}
            alt="logo"
          />
          <Text
            className={fontFamily.value.className}
            size={34}
            sx={{
              display: md ? "block" : "none"
            }}
          >
              Dictionary
            </Text>
          </Flex>
          <Flex
            gap={20}
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
            {/* <Divider orientation='vertical' />
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
                    backgroundColor: colours.primary
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
            </Flex> */}
          </Flex>
        </Flex>
      </header>
    )
}