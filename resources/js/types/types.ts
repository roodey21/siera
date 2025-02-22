interface LetterNumber {
    id: number
    letter_type: {
        id: number
        name: string
    }
    number: string
    pic: string
    date: string
    description: string
    code: string
    status: string
    created_at: string
    updated_at: string
}

interface LetterType {
    id: number
    name: string
    folder: string
}

interface User {
    id: number
    name: string
    email: string
    phone: string
    roles: string
    department: Department
    status: "active" | "inactive"
    created_at: string
    updated_at: string
    deleted_at: string
    avatar: string
}

interface Classification {
    id: number
    code: string
    type: string
    description: string
    created_at: string
    updated_at: string
}

interface Letter {
    id: number
    letter_number: LetterNumber
    user: User
    classification: Classification
    summary: string
    attachment_url: string
    sender: User
    receiver: User
    received_date: string
    created_at: string
    updated_at: string
    deleted_at: string
    archived_at: string
    date: string
    has_been_read: boolean
    dispositions: Disposition[]
    comments?: Comment[]
}

interface Department {
    id: number
    name: string
    description: string
}

interface Role {
    id: number
    name: string
}

interface Disposition {
    id: number
    to: string
    note: string
    letter_id: number
    created_at: string
    updated_at: string
}

interface Comment {
    id: number
    commentable_id: number
    commentable_type: string
    user: User
    body: string
    created_at: string
    updated_at: string
}
export type { LetterNumber, LetterType, User, Classification, Letter, Department, Role, Comment, Disposition }
