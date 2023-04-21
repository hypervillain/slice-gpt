export const createPrompt1 = ({ slicePrompt }) => {
    return `
    You MUST respond only with valid schema compliant JSON and NO other text.

    Your goal is to create a Prismic shared slice model, which will be used by developers to create UI components. The model may contain variations. Variations express different but closely related data requirements. All fields in the model should use camelCase and be both concise and easily readable. For example, given the prompt “A HeroSection with a short title, a description, and an optional background image”, you should create a model with primary fields “title”, “description” and “backgroundImage”. If you are not sure of the type of the data, use Text by default. In the example, the model should contain 2 variations: 1 without a ‘backgroundImage’ property, and 1 with the property. Don’t write text or explain the result, I just need the JSON structure of the model.
    If you hesitate between a Text and a RichText, use a RichText. If you can’t infer the data type, use Text. There should be an "id" property representing the variation like if the variation have an extra text field then the “id” should be like “with_extra_text” or if the variation contains a list the id should be like “with_list”. When there is a group of elements, you should put them in the "items" object, as it allows users to write a list of such elements.

    Here is an example model containing all existing fields in Prismic:
    \`\`\`JSON
{
  "id": "sliceId",
  "type": "SharedSlice",
  "name": "HeaderSection",
  "variations": [
    {
      "id": "default",
      "name": "Default Header Section",
      "description": "A HeaderSection with all existing fields in Prismic",
      "imageUrl": "",
      "docURL": "",
      "version": "1.0",
      "primary": {
        "title": {
          "type": "Text",
          "config": {
            "label": "Title",
            "useAsTitle": true
          }
        },
        "description": {
          "type": "StructuredText",
          "config": {
            "label": "Description",
            "multi": "paragraph"
          }
        },
        "image": {
          "type": "Image",
          "config": {
            "label": "Image",
            "thumbnails": []
          }
        },
        "linkto": {
          "type": "Link",
          "config": {
            "label": "linkToExternalURL",
            "placeholder": "",
            "allowTargetBlank": true,
            "select": null
          }
        },
        "linktomedia": {
          "type": "Link",
          "config": {
            "label": "linkToMedia",
            "placeholder": "",
            "select": "media"
          }
        },
        "internalcontentrelationship": {
          "type": "Link",
          "config": {
            "label": "internalContentRelationship",
            "select": "document",
            "customtypes": [
              "page"
            ]
          }
        },
        "selectfield": {
          "type": "Select",
          "config": {
            "label": "selectField",
            "placeholder": "",
            "options": [
              "Text 1",
              "Text 2",
              "Text 3"
            ]
          }
        },
        "boolean": {
          "type": "Boolean",
          "config": {
            "label": "boolean",
            "placeholder_false": "false",
            "placeholder_true": "true",
            "default_value": true
          }
        },
        "date": {
          "type": "Date",
          "config": {
            "label": "date",
            "placeholder": ""
          }
        },
        "timestamp": {
          "type": "Timestamp",
          "config": {
            "label": "timestamp",
            "placeholder": ""
          }
        },
        "embed": {
          "type": "Embed",
          "config": {
            "label": "embed",
            "placeholder": "Youtube embed"
          }
        },
        "numberofproducts": {
          "type": "Number",
          "config": {
            "label": "numberOfProducts",
            "placeholder": "Current number of products in DB"
          }
        },
        "googlemap": {
          "type": "GeoPoint",
          "config": {
            "label": "googleMap"
          }
        },
        "buttoncolor": {
          "type": "Color",
          "config": {
            "label": "buttonColor",
            "placeholder": ""
          }
        },
        "simpletext": {
          "type": "Text",
          "config": {
            "label": "simpleText",
            "placeholder": ""
          }
        }
      },
      "items": {}
    }
  ]
}
\`\`\`
    
    * You MUST return the structured data as a JSON object that is compliant with the following TypeScript type, that comes from @prismicio/types-internal package:
    
    \`\`\`typescript
    type TypesRecord = {
        type: "Color";
        fieldset?: string | null | undefined;
        config?: {
            label?: string | null | undefined;
            placeholder?: string;
        };
    } | {
        type: "Timestamp";
    } & {
        fieldset?: string | null | undefined;
        config?: {
            label?: string | null | undefined;
            placeholder?: string;
            default?: string;
        };
    } | {
        type: "Text";
    } & {
        fieldset?: string | null | undefined;
        config?: {
            label?: string | null | undefined;
            useAsTitle?: boolean;
            placeholder?: string;
        };
    } | {
        type: "Separator";
    } & {
        config?: {
            label?: string | null | undefined;
        };
    } | {
        type: "Select";
    } & {
        fieldset?: string | null | undefined;
        config?: {
            label?: string | null | undefined;
            placeholder?: string;
            default_value?: string;
            options?: readonly string[];
        };
    } | {
        type: "StructuredText";
    } & {
        fieldset?: string | null | undefined;
        config?: {
            label?: string | null | undefined;
            placeholder?: string;
            useAsTitle?: boolean;
            single?: string;
            multi?: string;
            imageConstraint?: {
                width?: number | null;
                height?: number | null;
            };
            labels?: readonly string[];
            allowTargetBlank?: boolean;
        };
    } | {
        type: "Range";
    } & {
        fieldset?: string | null | undefined;
        config?: {
            label?: string | null | undefined;
            placeholder?: string;
            min?: number;
            max?: number;
            step?: number;
        };
    } | {
        type: "Number";
    } & {
        fieldset?: string | null | undefined;
        config?: {
            label?: string | null | undefined;
            placeholder?: string;
            min?: number;
            max?: number;
            step?: number;
        };
    } | {
        label?: string | null | undefined;
        useAsTitle?: boolean;
        placeholder?: string;
        select?: "media" | "document" | "web" | null;
        customtypes?: readonly string[];
        masks?: readonly string[];
        tags?: readonly string[];
        allowTargetBlank?: boolean;
    } | {
        type: "IntegrationFields";
    } & {
        fieldset?: string | null | undefined;
        config?: {
            label?: string | null | undefined;
            placeholder?: string;
            catalog?: string;
        };
    } | {
        label?: string | null | undefined;
        placeholder?: string;
        constraint?: {
            width?: number | null;
            height?: number | null;
        };
        thumbnails?: readonly ({
            name: string;
        } & {
            width?: number | null;
            height?: number | null;
        })[];
    } | {
        type: "GeoPoint";
    } & {
        fieldset?: string | null | undefined;
        config?: {
            label?: string | null | undefined;
        };
    } | {
        type: "Embed";
    } & {
        fieldset?: string | null | undefined;
        config?: {
            label?: string | null | undefined;
            placeholder?: string;
            useAsTitle?: boolean;
        };
    } | {
        type: "Date";
    } & {
        fieldset?: string | null | undefined;
        config?: {
            label?: string | null | undefined;
            placeholder?: string;
            default?: string;
        };
    } | {
        type: "Boolean";
    } & {
        config?: {
            label?: string | null | undefined;
            default_value?: boolean;
            placeholder_true?: string;
            placeholder_false?: string;
        };
    } | {
        type: "Image";
    } & {
        fieldset?: string | null | undefined;
        config?: {
            label?: string | null | undefined;
            placeholder?: string;
            constraint?: {
                width?: number | null;
                height?: number | null;
            };
            thumbnails: {
                name: string;
                width?: number | null;
                height?: number | null;
            }[];
        };
    }
    
    type SharedSlice = {
        id: string;
        type: "SharedSlice";
        name: string;
        variations: readonly {
            id: string;
            name: string;
            description: string;
            imageUrl: string;
            docURL: string;
            version: string;
            display?: string;
            primary?: TypesRecord;
            items?: TypesRecord;
        }[];
        description?: string;
    }
    \`\`\`
    
    HUMAN PROMPT: "${slicePrompt}"
`
}

export const createPrompt2 = () => {
    return `
    Using the same prompt, create a React Typescript component, that uses your previously created Slice model. The property \`slice\` comes from the Prismic API. If the model contains several variations, create conditions to only use optional data if it exists in the current variation. Use CSS modules in a separate file to style the component. The component should look like Tailwind UI components.

* Text values should be rendered as string
* RichText values should be rendered using PrismicRichText from "@prismicio/react" package.
* the type \`\${ComponentName}Props\` should be created like this: \`SliceComponentProps<Content.\${ComponentName}>;\` For example, if the component is named CallToAction, you should:
  - extract \`SliceComponentProps\` from "@prismicio/react" and \`Content\` from "@prismicio/client"
  - write \`type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;\`
  - use the type whenever needed
* if \`items\` exists, it has to be extracted from \`slices\`. It is an array of objects, where each object contains the fields specified in the model. For example, if the model contains a property \`listItems\` in \`items\`, then \`slice.items[0]\` will contain a property \`listItems\` that you can treat like you would treat a regular value.

Here is an example of such a component:

\`\`\`typescript
import type { Content } from "@prismicio/client";
import {
  PrismicRichText,
  SliceComponentProps,
  JSXMapSerializer,
} from "@prismicio/react";


const components: JSXMapSerializer = {
  label: ({ node, children }) => {
    if (node.data.label === "codespan") {
      return <code>{children}</code>;
    }
  },
};

type RichTextProps = SliceComponentProps<Content.RichTextSlice>;

export default function RichText({ slice }: RichTextProps) {
  const { items } = slice;
  const listItems = items ? items.listItems : null;
  return (
    <section className={"mt-6 flow-root"}>
      <PrismicRichText field={slice.primary.content} components={components} />
      {
        listItems && (
          <ul className={styles.listItems}>
            {listItems.map((detail, index) => (
              <li key={index} className={styles.listItem}>
                {detail}
              </li>
            ))}
          </ul>
        )}
      }
    </section>
  );
}
\`\`\`

And it's corresponding (very basic) style file:
\`\`\`css
.richtext {
  max-width: 600px;
  margin: 6em auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
\`\`\`\`

I expect something more elaborate in term of styling!
    
`
}

export const createPrompt3 = ({ brandIdentity, keyPropositions, mocks }) => {
    return `
    Using the brand identity and key propositions contained in the prompt, update this Slice mocks with relevant and catchy, marketing content. All lorem ipsum or mock values should be updated. The content will be used on a start-up website to communicate values to our customers.
    
    * Don't update values for Images (eg. unsplash links)
    
    The mock that needs to be updated:
    \`\`\`JSON
        ${mocks}
    \`\`\`
    
    The brand identity: "${brandIdentity}"
    
    The key propositions: "${keyPropositions}" 
    
    
`
}