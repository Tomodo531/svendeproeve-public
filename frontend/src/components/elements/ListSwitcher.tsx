import * as Tabs from '@radix-ui/react-tabs'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { TopContributor } from '@components/topContributor/TopContributor'
import LatestFines from './LatestFines'

type Tabs = 'my-unpaid-fines' | 'top-contributors'

type Trigger = {
    title: string
    type: Tabs
}

export const ListSwitcher = () => {
    const [activeTab, setActiveTab] = useState<Tabs>('my-unpaid-fines')

    const triggers: Trigger[] = [
        {
            title: 'My latest fines',
            type: 'my-unpaid-fines',
        },
        {
            title: 'Top contributors',
            type: 'top-contributors',
        },
    ]

    return (
        <Tabs.Root
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as Tabs)}
        >
            <Tabs.List className="flex w-full rounded-full bg-gray-1 p-[6px] mt-4">
                    {triggers.map(({ title, type }, i) => (
                        <Tabs.Trigger
                            key={i}
                            value={type}
                            className="relative flex-1 rounded-full px-4 py-2 text-center text-sm text-offWhite"
                        >
                            {type === activeTab && (
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-gray-2"
                                    layoutId="tabs"
                                    transition={{
                                        type: 'spring',
                                        stiffness: 500,
                                        damping: 36,
                                    }}
                                />
                            )}
                            <span className="relative z-10 font-semibold">{title}</span>
                        </Tabs.Trigger>
                    ))}

            </Tabs.List>

            <Tabs.Content value="my-unpaid-fines">
                <LatestFines/>
            </Tabs.Content>

            <Tabs.Content value="top-contributors">
                <TopContributor/>
            </Tabs.Content>
        </Tabs.Root>

    )
}
