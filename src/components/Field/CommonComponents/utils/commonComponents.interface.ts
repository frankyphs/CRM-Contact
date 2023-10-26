import { Slot } from "@fluentui/react-components"
import { SizeType } from "../../utils/field.interface"

export interface InactiveReadViewProps {
  openActionButton?: (ev: any) => void
  size?: SizeType
  defaultValue?: string
  input?: NonNullable<Slot<"input">>
  disabled?: boolean
  contentAfter?: Slot<"span">
  contentBefore?: Slot<"span">
  onClick?: () => void
}

export interface ActionButtonContainerProps {
  disabled?: boolean
  saveDisabled?: boolean
  size?: SizeType
  saveLabel?: string
  cancelLabel?: string
  onCancel: () => void
  onSave: () => void
  className?: string
  style?: React.CSSProperties
}
