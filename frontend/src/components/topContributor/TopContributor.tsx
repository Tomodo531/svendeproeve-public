import axios from '@lib/axios'
import React, { useEffect, useState } from 'react'
import Contributor from '@components/topContributor/Contributor'
import { useGlobalContext } from 'context/GlobalContext'

export const TopContributor = () => {
    const { topContributors } = useGlobalContext()

    return (
        <div>
            {topContributors.map((contributor, index) => (
                <Contributor contributor={contributor} index={index} key={contributor.user_id} />
            ))}
        </div>
    )
}
