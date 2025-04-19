-- AlterTable
CREATE SEQUENCE gameplayer_order_seq;
ALTER TABLE "GamePlayer" ALTER COLUMN "order" SET DEFAULT nextval('gameplayer_order_seq');
ALTER SEQUENCE gameplayer_order_seq OWNED BY "GamePlayer"."order";
