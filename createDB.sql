
CREATE TABLE requirements (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR NOT NULL,
    description VARCHAR NOT NULL
);

CREATE TABLE document_types (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR NOT NULL,
    description VARCHAR NOT NULL
);

CREATE TABLE requirement_document_types (
    requirement_id uuid,
    document_type_id uuid,
    PRIMARY KEY (requirement_id, document_type_id),
    FOREIGN KEY (requirement_id) REFERENCES requirements(id),
    FOREIGN KEY (document_type_id) REFERENCES document_types(id)
);


CREATE TABLE documents (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    document_type_id uuid,
    content VARCHAR,
    version INTEGER,
    is_latest BOOLEAN,
    validation_status VARCHAR,
    expiration_date DATE,
    FOREIGN KEY (document_type_id) REFERENCES document_types(id)
);

INSERT INTO requirements (id, name, description) VALUES
('02bfc1e0-3fd9-4381-b8d7-109892bce608', 'Climate change action plan oversight / effectiveness', 'Internal monitoring and governance are in place to oversee the implementation and effectiveness of the action plan related to climate change adaptation and mitigation, ensuring objectives are met and improvements are made'),
('f5f8888b-c925-434a-ab40-89f6dc0ba51c', 'Climate change adaptation and mitigation targets', 'The organization has set targets related to the adaptation and mitigation of climate change impacts'),
('42b940a0-02b5-48ed-8728-9fdd46b62363', 'Climate change adaptation and mitigation targets oversight', 'Internal monitoring and governance mechanisms are in place to oversee the achievement of targets related to climate change adaptation and mitigation, ensuring alignment with strategic objectives and compliance with established policies'),
('da1f8575-3abf-4656-ade6-51eb7f84a029', 'Awareness training on climate actions', 'The organization has established training programmes for employees to raise awareness and understanding on climate change and initiatives deployed to foster adaptation or mitigation'),
('fc7f8fd5-51c1-470d-8663-009ea1d635ad', 'Climate change-related financial impacts oversight (methodology and assumptions)', 'A clear methodology for calculating climate change-related financial impacts has been formalized, laying out the calculation steps, data sources used and assumptions made'),
('ab402b43-388f-406a-a16f-537b01456725', 'Cilmate change-related financial impact reporting', 'The organization tracks and reports KPIs related to climate change-related financial impacts'),
('c0055613-29bf-4cd6-9373-a6fc0a11cb99', 'Anti-corruption policy', 'The company has formalized an anti-corruption or anti-bribery policy \n- that is consistent with the UN Convention against Corruption\n- for which the timetable for implementation is clearly defined\n- with a clear communication plan to relevant populations '),
('6a5b7f98-db3d-4572-a0c7-9f2241d484ac', 'Policy on conflicts of interest', 'The organization has formalized a Policy committing to the identification, disclosure, and management of conflicts between personal interests and the organizations interests to ensure integrity and transparency in decisions.'),
('92bcb75b-ed2b-405d-a7dc-d549f05c6658', 'Anti-corruption training', 'The organization has set up training programmes for internal stakeholders regarding anti-corruption or anti-bribery\nThe organization clearly provides\n- Details on nature, scope and depth of training programmes\n- Whether supervisory bodies participate or not\n- An analysis of training activities (by region or by category)'),
('a3c84097-2215-46d5-a139-3930b5c4379e', 'Control procedures to prevent and adress corruption', 'The organization has procedures in place to prevent, detect and address allegations or incidents of corruption\nProcedures clearly specify\n- investigators or investigating committee and whether theyre separate from internal Legal team\n- how outcomes are reported to administrative, management and supervisory bodies\n- deployment plans throughout the organization'),
('b79cde05-eeae-4f53-a8b1-b1748e2c28ed', 'Audit of control procedures', 'The organization has mechanisms or processes in place to regularly evaluate the effectiveness of internal controls and procedures, aiming to mitigate risks, ensure compliance, and safeguard the organizations integrity.'),
('3fa632d7-ad86-493e-acc3-47fcb039a3a1', 'Corruption due diligence', 'The organization has mechanisms or processes in place to conduct due diligence on corruption risks in business relationships and transactions, aimed at identifying and mitigating potential corruption before engagement.'),
('ea55df62-1d87-4947-84a8-578052dee279', 'Anti-corruption reporting', 'The organization monitors relevant KPIS regarding corruption and bribery matters\n- Training coverage\n- Violations, fines, incidents'),
('c97141fb-e58d-471f-ab43-05337b421eb3', 'Anti-corruption certification', 'The organization undergoes third-party verification of its anti-corruption management system, demonstrating compliance with international anti-corruption standards and a commitment to ethical business practices.'),
('1801a255-f0fc-4d2f-94bb-a74751d29701', 'Disciplinary system and sanctions in the event of misconduct', 'The organization has implemented a disciplinary system and sanctions in the event of misconduct or breach against the code of conduct');


INSERT INTO document_types (id, name, description) VALUES
('45114f8e-137c-4e3e-9e78-14a7eb5389ac', 'Climate change action plan', 'Detailed plan addressing climate change-related impacts, risks and opportunities and detailing specific actions to be taken to address climate change through mitigation and adaptation strategies'),
('a76b3d96-c889-4e5f-af47-38f5f8b5daf0', 'Climate change policy', 'Policy document outlining an organizations commitment, strategies, and actions to address climate change'),
('cac4ae09-caa8-40a5-8326-3a7be46b0c47', 'Climate change training slides', 'Educational materials designed to inform and train on climate change impacts, mitigation, and adaptation strategies'),
('852ead18-0de3-4432-95dc-a3068da54675', 'Climate change training attendance sheet', 'Record of participants who attended climate change-related training sessions'),
('296b7822-9333-43e0-872e-b498a9d61a5d', 'Reporting relative to climate change adaptation and mitigation', 'Report presenting the main KPIs relative to climate change adaptation and mitigation'),
('205a5cf0-26f3-4443-9f0e-bb4725762fef', 'Commitment and targets on anti-corruption', 'Formalized commitments and targets relative to corruption.'),
('aab91b92-fd82-4e57-843b-fc50730e8580', 'Ethics charter', 'Formalized policy presenting the commitments made and actions implemented relating to the management of business ethics.\n The document should cover multiple ethics issues such as corruption, fraud, etc.'),
('689c2c0a-1e97-4d5e-9131-237bf1f6b8b7', 'Commitment and targets on conflicts of interest', 'Formalized commitments and targets relative to conflicts of interest.'),
('d26d059b-e0fb-40ff-8fc6-2884f3bb4b98', 'Corruption training presentation', 'Provide evidence of recurring corruption awareness training by your employees.'),
('da92689c-ac96-4735-b80d-723bc5ccf5de', 'Corruption training attendance sheet', 'Provide evidence of corruption awareness training completion by your employees.'),
('f3a6bfb1-99e6-4248-ac29-59a8c4e821f6', 'Corruption and fraud management procedure', 'Procedure detailing how the organization prevents, identifies, and remediates situations of fraud and corruption.'),
('fd79f9b1-7c1e-4346-8ff2-433de0e30cb0', 'Expense management procedure', 'Procedure detailing rules set relative to employee expenses: thresholds, approval mechanisms, etc.'),
('f20ceff0-bd22-46a6-ac49-17f82c576931', 'Gifts and invitations procedure', 'Procedure detailing rules set relative to gits and invitations: circumstances under which they can be accepted, maximum amounts, declaration, approval mechanisms.'),
('bfa4fd2e-d145-426a-b67a-cb37c0d02587', 'Fraud and corruption audit schedule', 'Provide evidence of an audit program in place to investigate effectiveness of control procedures in place.'),
('ef85f301-7681-4b05-b284-91bab499131c', 'Financial statements auditing mission letter', 'Provide evidence of financial statements verification by a third-party auditor.'),
('3ea58e26-edd4-42d2-8e69-e9c5b51936d0', 'KYC procedure', 'Procedure detailing rules and processes in place to verify third-party identity prior to establishing a business relationship'),
('771d7d55-33a0-451c-b34b-56073f38fb13', 'Anti-corruption KPIs reporting', 'Report presenting the main KPIs monitored to measure the impact of anti-corruption initiatives'),
('398c229e-80af-43e5-bd03-3be758fd357f', 'ISO37001 certificate', 'Certificate provided by an approved third-party auditor proving the organizations endorsement of ISO37001 principles.');

INSERT INTO requirement_document_types (requirement_id, document_type_id) VALUES
('02bfc1e0-3fd9-4381-b8d7-109892bce608', '45114f8e-137c-4e3e-9e78-14a7eb5389ac'),
('f5f8888b-c925-434a-ab40-89f6dc0ba51c', 'a76b3d96-c889-4e5f-af47-38f5f8b5daf0'),
('42b940a0-02b5-48ed-8728-9fdd46b62363', 'a76b3d96-c889-4e5f-af47-38f5f8b5daf0'),
('da1f8575-3abf-4656-ade6-51eb7f84a029', 'cac4ae09-caa8-40a5-8326-3a7be46b0c47'),
('da1f8575-3abf-4656-ade6-51eb7f84a029', '852ead18-0de3-4432-95dc-a3068da54675'),
('fc7f8fd5-51c1-470d-8663-009ea1d635ad', '296b7822-9333-43e0-872e-b498a9d61a5d'),
('ab402b43-388f-406a-a16f-537b01456725', '296b7822-9333-43e0-872e-b498a9d61a5d'),
('c0055613-29bf-4cd6-9373-a6fc0a11cb99', '205a5cf0-26f3-4443-9f0e-bb4725762fef'),
('c0055613-29bf-4cd6-9373-a6fc0a11cb99', 'aab91b92-fd82-4e57-843b-fc50730e8580'),
('6a5b7f98-db3d-4572-a0c7-9f2241d484ac', '689c2c0a-1e97-4d5e-9131-237bf1f6b8b7'),
('6a5b7f98-db3d-4572-a0c7-9f2241d484ac', 'aab91b92-fd82-4e57-843b-fc50730e8580'),
('92bcb75b-ed2b-405d-a7dc-d549f05c6658', 'd26d059b-e0fb-40ff-8fc6-2884f3bb4b98'),
('92bcb75b-ed2b-405d-a7dc-d549f05c6658', 'da92689c-ac96-4735-b80d-723bc5ccf5de'),
('a3c84097-2215-46d5-a139-3930b5c4379e', 'f3a6bfb1-99e6-4248-ac29-59a8c4e821f6'),
('a3c84097-2215-46d5-a139-3930b5c4379e', 'fd79f9b1-7c1e-4346-8ff2-433de0e30cb0'),
('a3c84097-2215-46d5-a139-3930b5c4379e', 'f20ceff0-bd22-46a6-ac49-17f82c576931'),
('b79cde05-eeae-4f53-a8b1-b1748e2c28ed', 'bfa4fd2e-d145-426a-b67a-cb37c0d02587'),
('b79cde05-eeae-4f53-a8b1-b1748e2c28ed', 'ef85f301-7681-4b05-b284-91bab499131c'),
('3fa632d7-ad86-493e-acc3-47fcb039a3a1', '3ea58e26-edd4-42d2-8e69-e9c5b51936d0'),
('ea55df62-1d87-4947-84a8-578052dee279', '771d7d55-33a0-451c-b34b-56073f38fb13'),
('c97141fb-e58d-471f-ab43-05337b421eb3', '398c229e-80af-43e5-bd03-3be758fd357f'),
('1801a255-f0fc-4d2f-94bb-a74751d29701', 'aab91b92-fd82-4e57-843b-fc50730e8580');


