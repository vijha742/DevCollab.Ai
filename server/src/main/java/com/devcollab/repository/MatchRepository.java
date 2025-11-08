package com.devcollab.repository;

import com.devcollab.model.Match;
import com.devcollab.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Match entity
 */
@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {

    List<Match> findByRequester(User requester);

    List<Match> findByRecipient(User recipient);

    List<Match> findByRequesterId(Long requesterId);

    List<Match> findByRecipientId(Long recipientId);

    List<Match> findByStatus(Match.MatchStatus status);

    @Query("SELECT m FROM Match m WHERE m.recipient.id = :userId AND m.status = :status")
    List<Match> findReceivedMatchesByStatus(@Param("userId") Long userId, @Param("status") Match.MatchStatus status);

    @Query("SELECT m FROM Match m WHERE m.requester.id = :userId AND m.status = :status")
    List<Match> findSentMatchesByStatus(@Param("userId") Long userId, @Param("status") Match.MatchStatus status);

    @Query("SELECT m FROM Match m WHERE (m.requester.id = :userId OR m.recipient.id = :userId) AND m.status = :status")
    List<Match> findAllMatchesByUserAndStatus(@Param("userId") Long userId, @Param("status") Match.MatchStatus status);

    Optional<Match> findByRequesterIdAndRecipientIdAndProjectId(Long requesterId, Long recipientId, Long projectId);

    boolean existsByRequesterIdAndRecipientIdAndStatus(Long requesterId, Long recipientId, Match.MatchStatus status);
}
