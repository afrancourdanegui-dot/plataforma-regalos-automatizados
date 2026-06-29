UPDATE occasions o
SET "addressId" = (
  SELECT a.id
  FROM addresses a
  WHERE a."personId" = o."personId"
  ORDER BY a."isPrimary" DESC, a."createdAt" ASC
  LIMIT 1
)
WHERE o."addressId" IS NULL
  AND EXISTS (
    SELECT 1 FROM addresses a2 WHERE a2."personId" = o."personId"
  );
