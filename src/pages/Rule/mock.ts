export type ConditionEnum =
  | 'family-new'
  | 'family-returning'
  | 'business-owner'
  | 'no-taxes-2021'

export type ActionEnum = 'document-request'

export type DocumentEnum =
  | '1040'
  | 'w2-previous-parent-a'
  | 'w2-previous-parent-b'
  | 'w2-current-parent-a'
  | 'w2-current-parent-b'
  | 'paystub'
  | 'business-documents'

export type Condition = {
  value: ConditionEnum | null
}

export type DocumentRequest = {
  value: DocumentEnum | null
  description?: string
}

export type Action = {
  value: ActionEnum | null
  payload: DocumentRequest
}

export const ALL_CONDITIONS: { value: ConditionEnum; label: string }[] = [
  { value: 'family-new', label: 'Family status is New' },
  { value: 'family-returning', label: 'Family status is Returning' },
  { value: 'business-owner', label: 'Is Business Owner' },
  { value: 'no-taxes-2021', label: 'Family did not file US Taxes' },
]

export const ALL_DOCUMENTS: { value: DocumentEnum; label: string }[] = [
  { value: '1040', label: '1040' },
  { value: 'w2-previous-parent-a', label: 'W2 - Parent A (Previous Year)' },
  { value: 'w2-previous-parent-b', label: 'W2 - Parent B (Previous Year)' },
  { value: 'w2-current-parent-a', label: 'W2 - Parent A (Current Year)' },
  { value: 'w2-current-parent-b', label: 'W2 - Parent B (Current Year)' },
  { value: 'paystub', label: 'Paystub' },
  { value: 'business-documents', label: 'Business Documents' },
]
