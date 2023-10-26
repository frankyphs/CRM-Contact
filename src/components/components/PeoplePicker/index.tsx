import React from 'react';
import { IPersonaProps } from '@fluentui/react/lib/Persona';
import {
  IBasePickerSuggestionsProps,
  IPickerItemProps,
  NormalPeoplePicker,
  PeoplePickerItem,
  ValidationState,
} from '@fluentui/react/lib/Pickers';

const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested People',
  mostRecentlyUsedHeaderText: 'Suggested Contacts',
  noResultsFoundText: 'No results found',
  loadingText: 'Loading',
  showRemoveButtons: false,
  suggestionsAvailableAlertText: 'People Picker Suggestions available',
  suggestionsContainerAriaLabel: 'Suggested contacts',
};

interface IPeoplePickerProps {
  /**
   * People list for picker option
   */
  peopleList: IPersonaProps[]

  /**
   * Limit number for picked people
   */
  peopleLimit?: number

  /**
   * Callback for when user change the picker selected value
   * @param selectedPeoples People(s) selected in the picker
   * @returns void
   */
  onChange: (selectedPeoples?: IPersonaProps[] | undefined) => void
}

const PeoplePicker: React.FunctionComponent<IPeoplePickerProps> = (props) => {
  const handleResolveSuggestions = (filterText: string, selectedPeoples?: IPersonaProps[] | undefined): IPersonaProps[] | PromiseLike<IPersonaProps[]> => {
    let newPeopleList: IPersonaProps[] = [...props.peopleList];
    if (Array.isArray(selectedPeoples) && selectedPeoples.length > 0) {
      newPeopleList = newPeopleList.filter(people => selectedPeoples?.some(selectedPeople => selectedPeople.id === people.id));
    }

    if (filterText) {
      return newPeopleList.filter(people => people.text?.toLowerCase().includes(filterText.toLowerCase()));
    } else {
      return newPeopleList;
    }
  }

  const handleEmptyResolveSuggestions = (selectedPeoples?: IPersonaProps[] | undefined): IPersonaProps[] | PromiseLike<IPersonaProps[]> => {
    let newPeopleList: IPersonaProps[] = [...props.peopleList];
    if (Array.isArray(selectedPeoples) && selectedPeoples.length > 0) {
      newPeopleList = newPeopleList.filter(people => !!!selectedPeoples?.some(selectedPeople => selectedPeople.id === people.id));
    }

    return newPeopleList;
  }

  const handleRenderItem = (props: IPickerItemProps<IPersonaProps>): JSX.Element => {
    const newProps = {
      ...props,
      item: {
        ...props.item,
        ValidationState: ValidationState.valid,
        showSecondaryText: true,
      },
    };
  
    return <PeoplePickerItem {...newProps} />;
  }
  
  const handleValidateInput = (input: string): ValidationState => {
    if (input.indexOf('@') !== -1) {
      return ValidationState.valid;
    } else if (input.length > 1) {
      return ValidationState.warning;
    } else {
      return ValidationState.invalid;
    }
  }

  const getTextFromItem = (persona: IPersonaProps): string => {
    return persona.text as string;
  }

  return (
    <div>
      <NormalPeoplePicker
        key='normal'
        className='ms-PeoplePicker'
        resolveDelay={300}
        pickerSuggestionsProps={suggestionProps}
        getTextFromItem={getTextFromItem}

        onResolveSuggestions={handleResolveSuggestions}
        onEmptyResolveSuggestions={handleEmptyResolveSuggestions}
        onRenderItem={handleRenderItem}
        onValidateInput={handleValidateInput}
        onChange={props.onChange}
        itemLimit={props.peopleLimit}
      />
    </div>
  );
};

export default PeoplePicker;


