import ParticipantForm from '@/components/forms/participant-form'
import { getParticipantById } from '@/server/data/participant.data'
import { type Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import React from 'react'

export interface ParticipantParams extends Params {
  participantId: string
}

interface Props {
  params: ParticipantParams
}

async function ParticipantDetailsPage({ params }: Props) {
  const isCreate = params.participantId === 'new'
  let data
  if (!isCreate) {
    const { item } = await getParticipantById(params.participantId)
    data = item
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Create Participant</h1>
      <ParticipantForm isCreate={isCreate} data={data} />
    </div>
  )
}

export default ParticipantDetailsPage
