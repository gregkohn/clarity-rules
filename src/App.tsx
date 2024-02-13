import { useRef, useState } from 'react'
import cx from 'classnames'
import {
  ArrowLeftIcon,
  InformationCircleIcon,
  TrashIcon,
} from '@heroicons/react/16/solid'
import RulesContainer from './components/RulesContainer'
import Select from './components/Select'
import Button from './components/Button'
import Input from './components/Input'

// const fakeInitialActions = [
//   {
//     value: 'document-request' as ActionEnum,
//     key: 0,
//     payload: {
//       value: 'w2-previous-parent-b' as DocumentEnum,
//       description: 'The description!!',
//     },
//   },
//   {
//     value: 'document-request' as ActionEnum,
//     key: 1,
//     payload: {
//       value: 'w2-current-parent-a' as DocumentEnum,
//       description: 'Parent a...',
//     },
//   },
// ]

type ConditionEnum =
  | 'family-new'
  | 'family-returning'
  | 'business-owner'
  | 'no-taxes-2021'

type ActionEnum = 'document-request'

type DocumentEnum =
  | '1040'
  | 'w2-previous-parent-a'
  | 'w2-previous-parent-b'
  | 'w2-current-parent-a'
  | 'w2-current-parent-b'
  | 'paystub'
  | 'business-documents'

type Condition = {
  value: ConditionEnum | null
}

type DocumentRequest = {
  value: DocumentEnum | null
  description?: string
}

type Action = {
  value: ActionEnum | null
  payload: DocumentRequest
}

const ALL_CONDITIONS: { value: ConditionEnum; label: string }[] = [
  { value: 'family-new', label: 'Family status is New' },
  { value: 'family-returning', label: 'Family status is Returning' },
  { value: 'business-owner', label: 'Is Business Owner' },
  { value: 'no-taxes-2021', label: 'Family did not file US Taxes' },
]

const ALL_DOCUMENTS: { value: DocumentEnum; label: string }[] = [
  { value: '1040', label: '1040' },
  { value: 'w2-previous-parent-a', label: 'W2 - Parent A (Previous Year)' },
  { value: 'w2-previous-parent-b', label: 'W2 - Parent B (Previous Year)' },
  { value: 'w2-current-parent-a', label: 'W2 - Parent A (Current Year)' },
  { value: 'w2-current-parent-b', label: 'W2 - Parent B (Current Year)' },
  { value: 'paystub', label: 'Paystub' },
  { value: 'business-documents', label: 'Business Documents' },
]

function App() {
  const newestConditionRef = useRef<HTMLButtonElement>(null)
  const [conditionCounter, setConditionCounter] = useState(0)
  const [conditions, setConditions] = useState<(Condition & { key: number })[]>(
    [{ value: null, key: 0 }]
  )

  const newestActionRef = useRef<HTMLButtonElement>(null)
  const [actionCounter, setActionCounter] = useState(0)
  const [actions, setActions] = useState<(Action & { key: number })[]>([
    {
      value: 'document-request',
      key: 0,
      payload: { value: null },
    },
  ])

  const applicationMatchCount: number = 692

  const getAvailableConditions = (index: number) => {
    const otherSelections = conditions.map(({ value }) => value)
    otherSelections.splice(index, 1)
    return ALL_CONDITIONS.filter(
      ({ value }) => !otherSelections.includes(value)
    )
  }

  const getAvailableDocuments = (index: number) => {
    const otherSelections = actions
      .filter((action) => action.value === 'document-request')
      .map(({ payload }) => payload.value)
    otherSelections.splice(index, 1)
    return ALL_DOCUMENTS.filter(({ value }) => !otherSelections.includes(value))
  }

  const handleAddCondition = () => {
    setConditions((prev) => [
      ...prev,
      { value: null, key: conditionCounter + 1 },
    ])
    setConditionCounter((prev) => prev + 1)
    requestAnimationFrame(() => {
      newestConditionRef.current?.focus()
    })
  }

  const handleDeleteCondition = (index: number) => {
    setConditions((prev) => prev.filter((_, prevIndex) => prevIndex !== index))
  }
  const handleAddAction = () => {
    setActions((prev) => [
      ...prev,
      {
        value: 'document-request',
        payload: { value: null },
        key: actionCounter + 1,
      },
    ])
    setActionCounter((prev) => prev + 1)
    requestAnimationFrame(() => {
      newestActionRef.current?.focus()
    })
  }

  const handleDeleteAction = (index: number) => {
    setActions((prev) => prev.filter((_, prevIndex) => prevIndex !== index))
  }

  const conditionsAreValid =
    conditions.filter((condition) => condition.value).length ===
    conditions.length

  const actionsAreValid =
    actions.filter((action) => action.payload.value).length === actions.length

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const payload = {
      conditions: conditions.map(({ value }) => value),
      actions: actions.map(({ value, payload }) => ({
        value,
        payload,
      })),
    }
    console.log('submitting', payload)
  }

  return (
    <form className="" onSubmit={handleSubmit}>
      <header className="flex justify-between items-center p-16 border-b border-gray-100">
        <a className="flex gap-16 items-center text-lg" href="..">
          <ArrowLeftIcon className="w-16 h-16 fill-gray-500" />
          <span>Advanced</span>
        </a>
        <div className="flex gap-12">
          <Button variant="secondary">Cancel</Button>
          <Button type="submit">Save and Enable Rule</Button>
        </div>
      </header>

      <main className="p-32">
        <div
          className={cx(
            'relative z-0',
            'before:-z-20 before:absolute before:inset-y-0 before:left-[30px] before:border-r-[5px] before:border-brand-light',
            'before:transition-transform before:duration-100',
            'after:-z-10 after:absolute after:inset-y-0 after:left-32 after:border-r',
            {
              'before:scale-x-0': !conditionsAreValid,
            }
          )}
        >
          <RulesContainer isValid={conditionsAreValid}>
            <RulesContainer.Header>Conditions</RulesContainer.Header>
            <RulesContainer.Body>
              <div className="space-y-12">
                {conditions.map((condition, index) => {
                  const id = `condition-${index}`
                  return (
                    <div
                      key={condition.key}
                      className="gap-32 flex items-center animate-fade-in"
                    >
                      <span className="min-w-32">
                        {index === 0 ? 'If' : 'and'}
                      </span>
                      <Select
                        name={id}
                        ref={
                          index === conditions.length - 1
                            ? newestConditionRef
                            : undefined
                        }
                        triggerClassName="min-w-300 text-left"
                        contentClassName="text-sm"
                        aria-label={`Choose condition ${index + 1}`}
                        placeholder="-- Select a condition --"
                        items={getAvailableConditions(index)}
                        value={condition.value ?? ''}
                        onValueChange={(value) => {
                          setConditions((prev) =>
                            prev.map((prevValue, prevIndex) => {
                              return index === prevIndex
                                ? {
                                    ...prevValue,
                                    value: value as ConditionEnum,
                                  }
                                : prevValue
                            })
                          )
                        }}
                      />
                      {conditions.length > 1 ? (
                        <Button
                          className="animate-fade-in"
                          variant="secondary"
                          size="small"
                          onClick={() => handleDeleteCondition(index)}
                          startIcon={TrashIcon}
                          srText={`Delete condition ${index}`}
                        />
                      ) : null}
                    </div>
                  )
                })}
              </div>
              <div className="mt-20">
                <Button
                  variant="tertiary"
                  onClick={handleAddCondition}
                  disabled={
                    !conditionsAreValid ||
                    conditions.length >= ALL_CONDITIONS.length
                  }
                >
                  Add Condition
                </Button>
              </div>
            </RulesContainer.Body>
            <RulesContainer.Footer>
              <InformationCircleIcon className="w-16 h-16 fill-gray-500" />
              <p>
                Given conditions match with {applicationMatchCount} existing
                applicant{applicationMatchCount !== 1 ? 's' : ''}
              </p>
            </RulesContainer.Footer>
          </RulesContainer>

          <RulesContainer isValid={actionsAreValid} className="mt-32">
            <RulesContainer.Header iconClassName="fill-green-500">
              Actions
            </RulesContainer.Header>
            <RulesContainer.Body>
              <div className="space-y-12">
                {actions.map((action, index) => {
                  const id = `action-${index}`
                  return (
                    <div
                      key={action.key}
                      className="gap-32 flex items-center animate-fade-in"
                    >
                      <Select
                        name={id}
                        ref={
                          index === actions.length - 1
                            ? newestActionRef
                            : undefined
                        }
                        triggerClassName="min-w-300 text-left"
                        contentClassName="text-sm"
                        aria-label={`Choose document ${index + 1}`}
                        placeholder="-- Select a document --"
                        items={getAvailableDocuments(index)}
                        value={action.payload.value ?? ''}
                        onValueChange={(value) => {
                          setActions((prev) =>
                            prev.map((prevValue, prevIndex) => {
                              return index === prevIndex
                                ? {
                                    ...prevValue,
                                    payload: {
                                      ...prevValue.payload,
                                      value: value as DocumentEnum,
                                    },
                                  }
                                : prevValue
                            })
                          )
                        }}
                      />
                      <Input
                        label="Description of Document"
                        placeholder="Description of Document"
                        widthClassName="w-300"
                        id={`description-${index}`}
                        value={action.payload.description ?? ''}
                        onChange={(e) => {
                          const { value } = e.target
                          setActions((prev) =>
                            prev.map((prevValue, prevIndex) => {
                              return index === prevIndex
                                ? {
                                    ...prevValue,
                                    payload: {
                                      ...prevValue.payload,
                                      description: value,
                                    },
                                  }
                                : prevValue
                            })
                          )
                        }}
                      />
                      {actions.length > 1 ? (
                        <Button
                          variant="secondary"
                          size="small"
                          className="animate-fade-in"
                          onClick={() => handleDeleteAction(index)}
                          startIcon={TrashIcon}
                          srText={`Delete action ${index}`}
                        />
                      ) : null}
                    </div>
                  )
                })}
              </div>
              <div className="mt-20">
                <Button
                  variant="tertiary"
                  onClick={handleAddAction}
                  disabled={
                    !actionsAreValid || actions.length >= ALL_DOCUMENTS.length
                  }
                >
                  Create document request
                </Button>
              </div>
            </RulesContainer.Body>
          </RulesContainer>
        </div>
      </main>
    </form>
  )
}

export default App
