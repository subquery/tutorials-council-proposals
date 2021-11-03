import { SubstrateEvent } from "@subql/types";
import { Proposal, Vote, Councillor } from "../types/models";

export async function handleCouncilProposedEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [accountId, proposal_index, proposal_hash, threshold],
    },
  } = event;
  // Retrieve the record by the accountID
  const proposal = new Proposal(accountId.toString());
  proposal.index = proposal_index.toString();
  proposal.account = accountId.toString();
  proposal.hash = proposal_hash.toString();
  proposal.voteThreshold = threshold.toString();
  proposal.block = event.block.block.header.number.toBigInt();
  await proposal.save();
}

export async function handleCouncilVotedEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [accountId, proposal_hash, approved_vote, numberYes, numberNo],
    },
  } = event;

  ensureCouncillor(accountId.toString());
  // Retrieve the record by the accountID
  const vote = new Vote(accountId.toString());
  vote.proposalHashId = proposal_hash.toString();
  vote.approvedVote = approved_vote.toString();
  vote.councillorId = accountId.toString();
  vote.votedYes = numberYes.toString();
  vote.votedNo = numberNo.toString();
  vote.block = event.block.block.header.number.toBigInt();
  await vote.save();
}

async function ensureCouncillor(accountId: string): Promise<void> {
  // ensure that our account entities exist
  let councillor = await Councillor.get(accountId);
  if (!councillor) {
    councillor = new Councillor(accountId);
  }
  councillor.numberOfVotes += 1;
  await councillor.save();
}
