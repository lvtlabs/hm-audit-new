-- SEQUENCE: public.audit_log_audit_id_seq

-- DROP SEQUENCE IF EXISTS public.audit_log_audit_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.audit_log_audit_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1
    OWNED BY audit_log.audit_id;

ALTER SEQUENCE public.audit_log_audit_id_seq
    OWNER TO postgres;

-- Table: public.audit_log

-- DROP TABLE IF EXISTS public.audit_log;

CREATE TABLE IF NOT EXISTS public.audit_log
(
    audit_id integer NOT NULL DEFAULT nextval('audit_log_audit_id_seq'::regclass),
    user_id integer NOT NULL,
    action character varying COLLATE pg_catalog."default" NOT NULL,
    old_value character varying COLLATE pg_catalog."default",
    new_value character varying COLLATE pg_catalog."default",
    description character varying COLLATE pg_catalog."default",
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by character varying COLLATE pg_catalog."default",
    CONSTRAINT audit_log_pkey PRIMARY KEY (audit_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.audit_log
    OWNER to postgres;