--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6 (Debian 15.6-1.pgdg120+2)
-- Dumped by pg_dump version 15.6 (Debian 15.6-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: user; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."user" (
    user_id integer NOT NULL,
    fio character varying(40) NOT NULL,
    age smallint NOT NULL,
    "motherUserId" integer,
    "fatherUserId" integer
);


ALTER TABLE public."user" OWNER TO root;

--
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_user_id_seq OWNER TO root;

--
-- Name: user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.user_user_id_seq OWNED BY public."user".user_id;


--
-- Name: user user_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."user" ALTER COLUMN user_id SET DEFAULT nextval('public.user_user_id_seq'::regclass);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."user" (user_id, fio, age, "motherUserId", "fatherUserId") FROM stdin;
1	Федя Пупкин	40	\N	\N
5	Slbert Jonson	15	\N	\N
2	Ляся Пупкина	14	32	33
37	Albert Jonson Jr.	100	33	32
38	Albert Jonson Jr.	100	33	32
39	Albert Jonson Jr.	100	33	32
40	Albert Jonson Jr.	100	33	32
41	Albert Jonson Jr.	100	33	32
30	Albert Jonson Jr.	14	1	2
31	Albert Jonson Jr.	14	1	2
32	Albert Jonson M.	45	\N	\N
33	Albert Jonson F.	66	\N	\N
34	Albert Jonson	14	32	33
\.


--
-- Name: user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.user_user_id_seq', 42, true);


--
-- Name: user PK_758b8ce7c18b9d347461b30228d; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY (user_id);


--
-- Name: user FK_6f14f2ecd1590403dd091d3c994; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_6f14f2ecd1590403dd091d3c994" FOREIGN KEY ("motherUserId") REFERENCES public."user"(user_id);


--
-- Name: user FK_9a8985819f088012eaeaffa0de9; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_9a8985819f088012eaeaffa0de9" FOREIGN KEY ("fatherUserId") REFERENCES public."user"(user_id);


--
-- PostgreSQL database dump complete
--

