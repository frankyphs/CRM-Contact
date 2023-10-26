import { useState } from "react";
import {
  Persona,
  Tag,
  TagGroup,
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
} from "@fluentui/react-components";

import { Edit16Regular } from "@fluentui/react-icons";
import { PersonaOption } from "./utils/dropDownField.interface";

export const OptionDropdown = (props: any) => {
  const onEditClick = (ev: any, data: any) => {
    props.onClickEdit(ev, data);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={
          props.size === "small"
            ? { fontSize: "12px" }
            : props.size === "large"
              ? { fontSize: "16px" }
              : { fontSize: "14px" }
        }
      >
        {props.option?.label}
      </div>
      <div
        style={{
          width: "25px",
          height: "25px",
          borderRadius: "5px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.backgroundColor = "#e0e0e0";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <Edit16Regular onClick={(ev) => onEditClick(ev, props.option)} />
      </div>
    </div>
  );
};

export const OptionPersona = (props: any) => {
  const onEditClick = (ev: any, data: any) => {
    props.onClickEdit(ev, data);
  };
  if (props.isDropdownOption) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Persona
          primaryText={
            props.size === "small"
              ? { style: { fontSize: "12px" } }
              : props.size === "large"
                ? { style: { fontSize: "16px" } }
                : { style: { fontSize: "14px" } }
          }
          size={
            props.size === "large"
              ? "medium"
              : props.size === "medium"
                ? "small"
                : "extra-small"
          }
          textAlignment="center"
          avatar={
            props.option?.data?.icon
              ? { image: { src: `${props.option?.data?.icon}` } }
              : { color: "colorful", "aria-hidden": true }
          }
          name={props.option?.label}
          presence={{ status: props.option?.data?.status }}
        />
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Persona
          primaryText={
            props.size === "small"
              ? { style: { fontSize: "12px" } }
              : props.size === "large"
                ? { style: { fontSize: "16px" } }
                : { style: { fontSize: "14px" } }
          }
          size={
            props.size === "large"
              ? "medium"
              : props.size === "medium"
                ? "small"
                : "extra-small"
          }
          textAlignment="center"
          avatar={
            props.option?.data?.icon
              ? { image: { src: `${props.option?.data?.icon}` } }
              : { color: "colorful", "aria-hidden": true }
          }
          name={props.option?.label}
          presence={{ status: props.option?.data?.status }}
        />

        <div
          style={{
            width: "25px",
            height: "25px",
            borderRadius: "5px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.backgroundColor = "#e0e0e0";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <Edit16Regular
            onClick={(ev) => onEditClick(ev, props.option as PersonaOption)}
          />
        </div>
      </div>
    );
  }
};

export const OptionMultiPersona = (props: any) => {
  return (
    <AvatarGroup
      layout="stack"
      style={{ alignItems: "center" }}
      size={props.size === "large" ? 24 : props.size === "small" ? 16 : 20}
    >
      {props.partitionedItems?.inlineItems?.map((name: any) => (
        <AvatarGroupItem name={name} key={name} />
      ))}
      {props.partitionedItems.overflowItems && (
        <AvatarGroupPopover>
          {props.partitionedItems?.overflowItems?.map((name: any) => (
            <AvatarGroupItem name={name} key={name} />
          ))}
        </AvatarGroupPopover>
      )}
    </AvatarGroup>
  );
};

export const OptionTags = (props: any) => {
  const onEditClick = (ev: any, data: any) => {
    props.onClickEdit(ev, data);
  };

  if (props.isDropdownOption) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Tag
          style={{ backgroundColor: props.option?.data?.color }}
          value={props.option?.id}
          key={props.option?.id}
          size={
            props.size === "large"
              ? "medium"
              : props.size === "small"
                ? "extra-small"
                : "small"
          }
          appearance="brand"
        >
          {props.option?.label}
        </Tag>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Tag
          style={{ backgroundColor: props.option?.data?.color }}
          value={props.option?.id}
          key={props.option?.id}
          size={
            props.size === "large"
              ? "medium"
              : props.size === "small"
                ? "extra-small"
                : "small"
          }
          appearance="brand"
        >
          {props.option?.label}
        </Tag>
        <div
          style={{
            width: "25px",
            height: "25px",
            borderRadius: "5px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.backgroundColor = "#e0e0e0";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <Edit16Regular
            onClick={(ev) => onEditClick(ev, props.option as PersonaOption)}
          />
        </div>
      </div>
    );
  }
};

export const MultiOptionTags = (props: any) => {
  const [hoveredTag, setHoveredTag] = useState<string | undefined>();

  const handleMouseEnter = (tagId: string): void => {
    setHoveredTag(tagId);
  };
  const handleMouseLeave = (): void => {
    setHoveredTag("");
  };
  return (
    <div
      style={
        !props.isEditing ? { paddingTop: "5px", paddingBottom: "5px" } : {}
      }
    >
      <TagGroup
        onDismiss={props.onTagClick}
        aria-label="Dismiss example"
        style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}
      >
        {props.selectedOptions?.map((tag: any, _: any) => (
          <InteractionTag
            onMouseEnter={() => handleMouseEnter(tag.id)}
            onMouseLeave={handleMouseLeave}
            size={
              props.size === "large"
                ? "medium"
                : props.size === "small"
                  ? "extra-small"
                  : "small"
            }
            appearance="brand"
            value={tag.id}
            key={tag.id}
          >
            <InteractionTagPrimary
              style={{ backgroundColor: `${tag?.data?.color}` }}
            >
              {tag.label}
            </InteractionTagPrimary>
            {props.isEditing && hoveredTag === tag.id ? (
              <InteractionTagSecondary
                style={{ backgroundColor: `${tag?.data?.color}` }}
                aria-label="remove"
              />
            ) : undefined}
          </InteractionTag>
        ))}
      </TagGroup>
    </div>
  );
};

export const InputValueDropdown = (props: any) => {
  return <div>{props.saveDropdown}</div>;
};
