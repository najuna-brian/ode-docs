import type { MDXComponents } from 'mdx/types';
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import Cards from "../components/Cards";
import Card from "../components/Card";

export default function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Tabs,
    TabItem,
    Cards,
    Card,
    ...components,
  };
}

