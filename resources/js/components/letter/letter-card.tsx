import {
    Card, CardContent
} from '@/components/ui/card'
import { formatGmailDate } from '@/helpers/formatDate'
import { cn } from '@/lib/utils'
import { Letter } from '@/types/types'
import { Separator } from '@radix-ui/react-separator'

export default function LetterCard({ letter, handleClick, inbox }: { letter: Letter, handleClick: () => void, inbox?: false }) {
    return (
        <Card key={letter.id} className={cn("cursor-pointer", !!inbox && "hover:bg-primary-foreground", (!!inbox && letter.has_been_read && "bg-primary-foreground"))} onClick={handleClick}>
            <CardContent className="p-5">
                <div className="flex justify-between">
                    <div className="flex flex-col letter-number">
                        <div className="font-semibold">{letter.letter_number.code}</div>
                        <p className="text-sm text-foreground">{letter.sender.name}</p>
                    </div>
                    <div className="text-sm letter-date">
                        {formatGmailDate(letter.created_at)}
                    </div>
                </div>
                <Separator className="my-4 bg-primary" />
                <div>
                    Perihal : {letter.letter_number.description}
                </div>
            </CardContent>
        </Card>
    )
}
