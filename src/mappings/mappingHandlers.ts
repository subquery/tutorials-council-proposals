import { SubstrateEvent } from '@subql/types'
import { Proposals, Votes } from '../types/models'

export async function handleCouncilProposedEvent(
	event: SubstrateEvent
): Promise<void> {
	const {
		event: {
			data: [accountId, proposal_index, proposal_hash, threshold],
		},
	} = event
	// Retrieve the record by the accountID
	const record = new Proposals(accountId.toString())
	record.index = proposal_index.toString()
	record.account = accountId.toString()
	record.hash = proposal_hash.toString()
	record.voteThreshold = threshold.toString()
	record.block = event.block.block.header.number.toBigInt()
	await record.save()
}

export async function handleCouncilVotedEvent(
	event: SubstrateEvent
): Promise<void> {
	const {
		event: {
			data: [accountId, proposal_hash, approved_vote, numberYes, numberNo],
		},
	} = event
	// Retrieve the record by the accountID
	const record = new Votes(accountId.toString())
	record.proposalHash = proposal_hash.toString()
	record.approvedVote = approved_vote.toString()
	record.account = accountId.toString()
	record.votedYes = numberYes.toString()
	record.votedNo = numberNo.toString()
	record.block = event.block.block.header.number.toBigInt()
	await record.save()
}
