--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1


--
-- Name: todo; Type: TABLE; Schema: public; Owner: vincecanger
--

CREATE TABLE todo (
    todo_id SERIAL,
    description character varying(255) NOT NULL,
    user_id integer NOT NULL,
    song character varying,
    title character varying
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: vincecanger
--

CREATE TABLE users (
    id SERIAL,
    name character varying(200) NOT NULL,
    email character varying(200) NOT NULL,
    password character varying(200) NOT NULL
);


--
-- Name: todo todo_pkey; Type: CONSTRAINT; Schema: public; Owner: vincecanger
--

ALTER TABLE ONLY todo
ADD CONSTRAINT todo_pkey PRIMARY KEY (todo_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: vincecanger
--

ALTER TABLE ONLY users
ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: vincecanger
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: todo constraint_fk; Type: FK CONSTRAINT; Schema: public; Owner: vincecanger
--

ALTER TABLE ONLY todo
    ADD CONSTRAINT constraint_fk FOREIGN KEY (user_id) REFERENCES users(id);


--
-- PostgreSQL database dump complete
--

