export interface DbmsQuestion {
  id: number;
  assignment: number; // 1 to 8
  assignmentTitle: string;
  topic: string;
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string; // 'a' | 'b' | 'c' | 'd'
  explanation: string;
}

export const DBMS_ASSIGNMENTS = [
  { id: 1, title: 'Assignment 1: DB Abstraction, Keys & Relational Algebra (Q1 - Q10)', count: 10 },
  { id: 2, title: 'Assignment 2: SQL DDL/DML, Joins, Group By & Views (Q11 - Q20)', count: 10 },
  { id: 3, title: 'Assignment 3: Relational Calculus, Triggers & ER Models (Q21 - Q30)', count: 10 },
  { id: 4, title: 'Assignment 4: Functional Dependencies & Normalization (Q31 - Q40)', count: 10 },
  { id: 5, title: 'Assignment 5: Storage Architecture, RAID & Buffer Mgmt (Q41 - Q50)', count: 10 },
  { id: 6, title: 'Assignment 6: Indexing, B+ Trees, 2-3-4 Trees & Hashing (Q51 - Q60)', count: 10 },
  { id: 7, title: 'Assignment 7: Transactions, Serializability & 2PL Locking (Q61 - Q70)', count: 10 },
  { id: 8, title: 'Assignment 8: Crash Recovery, Checkpoints & Query Optimization (Q71 - Q80)', count: 10 },
];

export const DBMS_QUESTIONS: DbmsQuestion[] = [
  // ==================== ASSIGNMENT 1 (Questions 1 to 10) ====================
  {
    id: 1,
    assignment: 1,
    assignmentTitle: 'Assignment 1',
    topic: 'Levels of Data Abstraction',
    question: 'Which level of abstraction describes types of data that are stored in the Database?',
    options: [
      { id: 'a', text: 'Physical level' },
      { id: 'b', text: 'Logical level' },
      { id: 'c', text: 'View level' },
      { id: 'd', text: 'Abstraction level' }
    ],
    correctOptionId: 'b',
    explanation: 'Logical level is the middle level of 3-level data abstraction architecture. It describes which type of data is stored in the database.'
  },
  {
    id: 2,
    assignment: 1,
    assignmentTitle: 'Assignment 1',
    topic: 'Candidate and Primary Keys',
    question: 'Identify the valid primary key for the relation course_registration(student_id, course_id, semester, grade) from the given instance where students take multiple courses and courses have multiple students.',
    options: [
      { id: 'a', text: 'student_id' },
      { id: 'b', text: 'course_id' },
      { id: 'c', text: 'student_id, course_id' },
      { id: 'd', text: 'semester' }
    ],
    correctOptionId: 'c',
    explanation: 'A primary key must uniquely identify each record in a table. The composite combination of (student_id, course_id) uniquely identifies each registration.'
  },
  {
    id: 3,
    assignment: 1,
    assignmentTitle: 'Assignment 1',
    topic: 'Schema vs Instance',
    question: 'Identify the correct statement/s regarding relation schema and instance:',
    options: [
      { id: 'a', text: 'Employee(empID, empName) is an instance of a relation schema.' },
      { id: 'b', text: 'Employee(empID, empName) is an example of a physical schema.' },
      { id: 'c', text: '(5012, Ananya) is an instance of a relation schema.' },
      { id: 'd', text: '(5012, Ananya) is an example of a logical schema.' }
    ],
    correctOptionId: 'c',
    explanation: '(5012, Ananya) is a concrete tuple/row representing an instance of the relation schema Employee(empID, empName).'
  },
  {
    id: 4,
    assignment: 1,
    assignmentTitle: 'Assignment 1',
    topic: 'Superkeys and Candidate Keys',
    question: 'Consider a relation BookStore(ISBN, Title, Price, Category) where superkeys are {ISBN}, {ISBN, Title}, {Price, Category}, and {Price, Category, Title}. Select the possible candidate key(s):',
    options: [
      { id: 'a', text: '{ISBN} and {Price, Category}' },
      { id: 'b', text: '{Price}' },
      { id: 'c', text: '{Category}' },
      { id: 'd', text: '{Price, Category, Title}' }
    ],
    correctOptionId: 'a',
    explanation: 'Minimal superkeys are candidate keys. {ISBN} is minimal. Also {Price, Category} is minimal since removing either attribute loses superkey property.'
  },
  {
    id: 5,
    assignment: 1,
    assignmentTitle: 'Assignment 1',
    topic: 'Relational Algebra Expressions',
    question: 'Consider relations Article(AID, Title, Citations) and ArticleTag(AID, Tag). What does ΠAID((σCitations>50 Article) ⨝ (σTag=\'AI\' ArticleTag)) represent?',
    options: [
      { id: 'a', text: 'Find the AID of all Articles with more than 50 Citations.' },
      { id: 'b', text: 'Find the AID of all Articles with more than 50 Citations or are of Tag \'AI\'.' },
      { id: 'c', text: 'Find the AID of all Articles with more than 50 Citations but not Tag \'AI\'.' },
      { id: 'd', text: 'Find the AID of all Articles with more than 50 Citations and are of Tag \'AI\'.' }
    ],
    correctOptionId: 'd',
    explanation: 'Selection conditions are applied to both relations, then natural join on AID is performed, followed by projection on AID. Thus both conditions must hold.'
  },
  {
    id: 6,
    assignment: 1,
    assignmentTitle: 'Assignment 1',
    topic: 'SQL DDL vs DML',
    question: 'Consider S1: INSERT INTO orders VALUES (501, 2001, \'2026-06-10\'); and S2: ALTER TABLE orders ADD COLUMN total_amount number(10, 2); Identify the correct classification:',
    options: [
      { id: 'a', text: 'Both S1 and S2 are Data Manipulation (DML) Queries' },
      { id: 'b', text: 'S1 is a Data Manipulation (DML) Query, and S2 is a Data Definition (DDL) Query' },
      { id: 'c', text: 'Both S1 and S2 are Data Definition (DDL) Queries' },
      { id: 'd', text: 'S1 is a Data Control Query, and S2 is a Data Definition (DDL) Query' }
    ],
    correctOptionId: 'b',
    explanation: 'INSERT modifies data rows (DML), whereas ALTER TABLE modifies schema structure (DDL).'
  },
  {
    id: 7,
    assignment: 1,
    assignmentTitle: 'Assignment 1',
    topic: 'Foreign Key & Referential Integrity',
    question: 'Given Department(DeptID: D101, D102) where DeptID is a foreign key in EmployeeAllocation(AllocationID, DeptID, EmployeeName). Which instance is valid?',
    options: [
      { id: 'a', text: '(A001, D101, Amit) and (A002, D105, Raj) [D105 does not exist]' },
      { id: 'b', text: '(A001, D101, Amit) and (A001, D102, Raj) [Duplicate AllocationID]' },
      { id: 'c', text: '(NULL, D102, Amit) and (A003, D102, Raj) [Primary key is NULL]' },
      { id: 'd', text: '(A001, D101, Amit) and (A002, D102, Raj)' }
    ],
    correctOptionId: 'd',
    explanation: 'Option (d) has unique non-null primary keys (A001, A002) and foreign keys referencing existing departments D101 and D102.'
  },
  {
    id: 8,
    assignment: 1,
    assignmentTitle: 'Assignment 1',
    topic: 'Relational Selection Operation',
    question: 'In RegionStats(RegionName, Population, Country), which operation selects regions with population at least 50000?',
    options: [
      { id: 'a', text: 'σPopulation ≥ 50000 (RegionStats)' },
      { id: 'b', text: 'σPopulation > 60000 (RegionStats)' },
      { id: 'c', text: 'σPopulation ≥ 50000 ∧ Country=\'Canada\' (RegionStats)' },
      { id: 'd', text: 'σPopulation ≥ 80000 (RegionStats)' }
    ],
    correctOptionId: 'a',
    explanation: 'Selection predicate σPopulation≥50000 accurately filters all tuples where Population ≥ 50000 across all countries.'
  },
  {
    id: 9,
    assignment: 1,
    assignmentTitle: 'Assignment 1',
    topic: 'Set Operations in Relational Algebra',
    question: 'Which operation on RegionStats1 and RegionStats2 produces only tuples present in both relations (Texas, Ontario)?',
    options: [
      { id: 'a', text: 'RegionStats1 − RegionStats2' },
      { id: 'b', text: 'RegionStats1 ∩ RegionStats2' },
      { id: 'c', text: 'RegionStats2 − RegionStats1' },
      { id: 'd', text: 'RegionStats1 ∪ RegionStats2' }
    ],
    correctOptionId: 'b',
    explanation: 'Intersection (∩) produces only tuples common to both relation instances.'
  },
  {
    id: 10,
    assignment: 1,
    assignmentTitle: 'Assignment 1',
    topic: 'Selection and Projection',
    question: 'To obtain a table showing only RegionName and Country for regions having Population ≥ 50000, what is the correct algebraic expression?',
    options: [
      { id: 'a', text: 'ΠRegionName, Country (RegionStats)' },
      { id: 'b', text: 'σPopulation ≥ 50000 (RegionStats)' },
      { id: 'c', text: 'ΠRegionName, Country (σPopulation ≥ 50000 (RegionStats))' },
      { id: 'd', text: 'σPopulation ≥ 50000 (ΠRegionName, Country (RegionStats))' }
    ],
    correctOptionId: 'c',
    explanation: 'First filter rows with σPopulation≥50000, then project columns RegionName and Country via Π.'
  },

  // ==================== ASSIGNMENT 2 (Questions 11 to 20) ====================
  {
    id: 11,
    assignment: 2,
    assignmentTitle: 'Assignment 2',
    topic: 'SQL UPDATE Statement',
    question: 'In CustomerOrders(OrderID, CustomerID, ItemCount), which query decrements ItemCount by 1 for entries where ItemCount > 2?',
    options: [
      { id: 'a', text: 'MODIFY CustomerOrders ItemCount=ItemCount-1 WHERE ItemCount>2;' },
      { id: 'b', text: 'UPDATE CustomerOrders SET ItemCount=ItemCount-1 WHERE ItemCount>2;' },
      { id: 'c', text: 'UPDATE CustomerOrders ItemCount=ItemCount-1 WHERE ItemCount>2;' },
      { id: 'd', text: 'ALTER CustomerOrders SET ItemCount=ItemCount-1 WHERE ItemCount>2;' }
    ],
    correctOptionId: 'b',
    explanation: 'SQL syntax for modifying row values uses UPDATE TableName SET column = expression WHERE condition.'
  },
  {
    id: 12,
    assignment: 2,
    assignmentTitle: 'Assignment 2',
    topic: 'Composite Primary Keys in SQL',
    question: 'In EmployeeDetails(EmpName, DeptName, City, Salary), neither EmpName nor DeptName alone is unique, but the combination of (EmpName, DeptName) is always unique. What is the correct CREATE TABLE statement?',
    options: [
      { id: 'a', text: 'CREATE TABLE EmployeeDetails (..., PRIMARY KEY (EmpName));' },
      { id: 'b', text: 'CREATE TABLE EmployeeDetails (..., PRIMARY KEY (EmpName, DeptName));' },
      { id: 'c', text: 'CREATE TABLE EmployeeDetails (..., PRIMARY KEY (DeptName));' },
      { id: 'd', text: 'CREATE TABLE EmployeeDetails (..., PRIMARY KEY (EmpName, City));' }
    ],
    correctOptionId: 'b',
    explanation: 'When individual columns contain duplicate entries, a composite key PRIMARY KEY (EmpName, DeptName) uniquely identifies each row.'
  },
  {
    id: 13,
    assignment: 2,
    assignmentTitle: 'Assignment 2',
    topic: 'SQL Joins and Aggregation',
    question: 'Given SalesRecords(SaleID, BookID, Quantity) and BookCatalog(BookID, Category: Fiction/Science). What is output of: SELECT Category, SUM(Quantity) FROM SalesRecords, BookCatalog WHERE SalesRecords.BookID = BookCatalog.BookID GROUP BY Category;',
    options: [
      { id: 'a', text: 'Fiction: 8, Science: 7' },
      { id: 'b', text: 'Fiction: 6, Science: 7' },
      { id: 'c', text: 'Fiction: 9, Science: 7' },
      { id: 'd', text: 'Fiction: 8, Science: 6' }
    ],
    correctOptionId: 'a',
    explanation: 'Fiction items: B001(qty 5), B003(qty 2), B001(qty 1) = 8. Science items: B002(qty 7) = 7.'
  },
  {
    id: 14,
    assignment: 2,
    assignmentTitle: 'Assignment 2',
    topic: 'SQL Views Creation',
    question: 'Identify the correct SQL statement to create a VIEW named Electronics_Products on InventoryDetails retrieving Name and Price where Category = \'Electronics\':',
    options: [
      { id: 'a', text: 'Create Electronics_Products AS SELECT Name, Price FROM InventoryDetails WHERE Category = \'Electronics\';' },
      { id: 'b', text: 'Create view Electronics_Products ON InventoryDetails SELECT Name, Price WHERE Category = \'Electronics\';' },
      { id: 'c', text: 'Create view Electronics_Products TO InventoryDetails SELECT Name, Price WHERE Category = \'Electronics\';' },
      { id: 'd', text: 'Create view Electronics_Products AS SELECT Name, Price FROM InventoryDetails WHERE Category = \'Electronics\';' }
    ],
    correctOptionId: 'd',
    explanation: 'Standard SQL syntax to define a view is: CREATE VIEW view_name AS SELECT ... FROM ... WHERE ...;'
  },
  {
    id: 15,
    assignment: 2,
    assignmentTitle: 'Assignment 2',
    topic: 'SQL LIKE Operator Wildcards',
    question: 'In CabDriverInfo(DriverID, Location), which location matches: WHERE Location LIKE \'B%\' AND Location LIKE \'%e\'?',
    options: [
      { id: 'a', text: 'Bhopal' },
      { id: 'b', text: 'Pune' },
      { id: 'c', text: 'Hyderabad' },
      { id: 'd', text: 'Bangalore' }
    ],
    correctOptionId: 'd',
    explanation: '\'B%\' matches strings starting with B (Bangalore, Bhopal). \'%e\' matches strings ending with e. Only Bangalore satisfies both conditions.'
  },
  {
    id: 16,
    assignment: 2,
    assignmentTitle: 'Assignment 2',
    topic: 'Natural Join vs Equi Join',
    question: 'Which relational algebra operation combines PurchaseRecords and InventoryCatalog on common attribute ProductID, eliminating duplicate columns from the output?',
    options: [
      { id: 'a', text: 'PurchaseRecords NATURAL JOIN InventoryCatalog' },
      { id: 'b', text: 'PurchaseRecords LEFT OUTER JOIN InventoryCatalog' },
      { id: 'c', text: 'PurchaseRecords RIGHT OUTER JOIN InventoryCatalog' },
      { id: 'd', text: 'PurchaseRecords EQUI JOIN InventoryCatalog ON ProductID' }
    ],
    correctOptionId: 'a',
    explanation: 'NATURAL JOIN automatically matches attributes with identical names and retains only one copy of common join attributes.'
  },
  {
    id: 17,
    assignment: 2,
    assignmentTitle: 'Assignment 2',
    topic: 'SQL WHERE Boolean Logic (OR vs AND)',
    question: 'To get all employees whose Salary is at least 60000 OR whose DeptName is \'Sales\', which SQL statement is correct?',
    options: [
      { id: 'a', text: 'SELECT * FROM EmployeeDetails WHERE Salary>=60000;' },
      { id: 'b', text: 'SELECT * FROM EmployeeDetails WHERE DeptName=\'Sales\';' },
      { id: 'c', text: 'SELECT * FROM EmployeeDetails WHERE Salary>=60000 AND DeptName=\'Sales\';' },
      { id: 'd', text: 'SELECT * FROM EmployeeDetails WHERE Salary>=60000 OR DeptName=\'Sales\';' }
    ],
    correctOptionId: 'd',
    explanation: 'Disjunction (OR) includes tuples satisfying either the salary criteria, the department criteria, or both.'
  },
  {
    id: 18,
    assignment: 2,
    assignmentTitle: 'Assignment 2',
    topic: 'SQL Aggregate Functions',
    question: 'Identify the correct SQL command to calculate the average salary of employees belonging to the \'HR\' department:',
    options: [
      { id: 'a', text: 'SELECT avg(Salary) FROM EmployeeDetails;' },
      { id: 'b', text: 'SELECT * FROM EmployeeDetails WHERE DeptName=\'HR\' AND avg(Salary);' },
      { id: 'c', text: 'SELECT * FROM EmployeeDetails WHERE DeptName=\'HR\' OR avg(Salary);' },
      { id: 'd', text: 'SELECT avg(Salary) FROM EmployeeDetails WHERE DeptName=\'HR\';' }
    ],
    correctOptionId: 'd',
    explanation: 'avg(Salary) computes average salary, filtered by the WHERE clause WHERE DeptName=\'HR\'.'
  },
  {
    id: 19,
    assignment: 2,
    assignmentTitle: 'Assignment 2',
    topic: 'SQL Subqueries with ALL Operator',
    question: 'Which query correctly finds employees whose salary is strictly greater than the salary of EVERY employee in the \'HR\' department?',
    options: [
      { id: 'a', text: 'SELECT EmpName, City FROM EmployeeDetails WHERE Salary > (SELECT Salary FROM EmployeeDetails WHERE DeptName=\'HR\');' },
      { id: 'b', text: 'SELECT EmpName, City FROM EmployeeDetails WHERE Salary > ALL (SELECT Salary FROM EmployeeDetails WHERE DeptName=\'HR\');' },
      { id: 'c', text: 'SELECT EmpName, City FROM EmployeeDetails WHERE Salary > ANY (SELECT Salary FROM EmployeeDetails WHERE DeptName=\'HR\');' },
      { id: 'd', text: 'SELECT EmpName, City FROM EmployeeDetails WHERE Salary >= ALL (SELECT Salary FROM EmployeeDetails WHERE DeptName=\'HR\');' }
    ],
    correctOptionId: 'b',
    explanation: 'The > ALL comparison operator evaluates to true if the value is greater than every single value returned by the subquery.'
  },
  {
    id: 20,
    assignment: 2,
    assignmentTitle: 'Assignment 2',
    topic: 'SQL CREATE INDEX Syntax',
    question: 'Identify the correct SQL statement to create an index named idx_dept on the DeptName attribute of table EmployeeDetails:',
    options: [
      { id: 'a', text: 'CREATE INDEX idx_dept ON EmployeeDetails(DeptName);' },
      { id: 'b', text: 'CREATE INDEX idx_dept FROM EmployeeDetails(DeptName);' },
      { id: 'c', text: 'CREATE TABLE idx_dept ON EmployeeDetails(DeptName);' },
      { id: 'd', text: 'CREATE INDEX EmployeeDetails ON idx_dept(DeptName);' }
    ],
    correctOptionId: 'a',
    explanation: 'Standard SQL index creation syntax is CREATE INDEX index_name ON table_name(column_name);.'
  },

  // ==================== ASSIGNMENT 3 (Questions 21 to 30) ====================
  {
    id: 21,
    assignment: 3,
    assignmentTitle: 'Assignment 3',
    topic: 'Relational Division & Union',
    question: 'In Uniform(School, Color), how many tuples are returned by: ((σSchool=\'KidSys\' ∨ Color=\'Blue\' Uniform) ÷ ΠColor(σColor=\'Blue\' Uniform)) ∪ ΠSchool(σColor=\'White\' Uniform)?',
    options: [
      { id: 'a', text: '4' },
      { id: 'b', text: '3' },
      { id: 'c', text: '2' },
      { id: 'd', text: '1' }
    ],
    correctOptionId: 'b',
    explanation: 'The division produces schools having blue uniforms (2 schools: GlobalEd, LPInternational). Union with schools having white uniforms (1 school: EduSys) yields 2 + 1 = 3 distinct tuples.'
  },
  {
    id: 22,
    assignment: 3,
    assignmentTitle: 'Assignment 3',
    topic: 'ER to Relational Schema Mapping',
    question: 'In an ER diagram, multiple Artisans make Handicrafts (many-to-many relationship Creates). Handicraft is identified by unique Tag, Material, and multi-colored. What is the correct schema?',
    options: [
      { id: 'a', text: 'Creates(Tag, ID) and Handicraft(Tag, Material, Color)' },
      { id: 'b', text: 'Creates(ID) and Handicraft(Tag, Material) and Handicraft_color(Tag, Color)' },
      { id: 'c', text: 'Creates(Tag, ID, Color) and Handicraft(Tag, Material)' },
      { id: 'd', text: 'Creates(Tag, ID), Handicraft(Tag, Material), and Handicraft_color(Tag, Color)' }
    ],
    correctOptionId: 'd',
    explanation: 'Many-to-many relationships require a junction table with foreign keys Creates(Tag, ID). Multivalued attributes (Color) must be decomposed into a separate table Handicraft_color(Tag, Color).'
  },
  {
    id: 23,
    assignment: 3,
    assignmentTitle: 'Assignment 3',
    topic: 'Generalization & Specialization Schema',
    question: 'In an ER diagram where Contact specializes into Personal and Professional contacts, which number of attributes can NOT be true for schemas designed under standard mapping?',
    options: [
      { id: 'a', text: 'n[Contact] = 2' },
      { id: 'b', text: 'n[Personal] = 1' },
      { id: 'c', text: 'n[Professional] = 1' },
      { id: 'd', text: 'n[Professional] = 3' }
    ],
    correctOptionId: 'b',
    explanation: 'Personal must contain at least the inherited primary key plus its own attribute (minimum 2 attributes). Thus n[Personal] = 1 cannot be true.'
  },
  {
    id: 24,
    assignment: 3,
    assignmentTitle: 'Assignment 3',
    topic: 'Weak Entities & Relationship Participation',
    question: 'In an ER diagram connecting Room and Occupant via relationship Room_Occ (many-to-many), which statement is TRUE?',
    options: [
      { id: 'a', text: 'Participation of Occupant is total in Room_Occ.' },
      { id: 'b', text: 'The primary key for Windows will be {Count, GlassType}.' },
      { id: 'c', text: 'The primary key in the relational schema for Room_Occ will be {RNo, OID}.' },
      { id: 'd', text: 'Participation of Room is total in Room_Occ.' }
    ],
    correctOptionId: 'c',
    explanation: 'The primary key of a many-to-many relationship relation is composed of the primary keys of the participating entity sets ({RNo, OID}).'
  },
  {
    id: 25,
    assignment: 3,
    assignmentTitle: 'Assignment 3',
    topic: 'Tuple Relational Calculus (TRC)',
    question: 'In Singer(SID, Genres, Experience, discography), which Tuple Relational Calculus expression selects Singer IDs with Experience > 20 years?',
    options: [
      { id: 'a', text: '{<t> | ∃ p,t ∈ Singer (t[Genres]=p[Genres] ∨ p[Experience]=20)}' },
      { id: 'b', text: '{<t> | ∃ p,t ∈ Singer (t[SID]=p[SID] ∨ p[Experience]>20)}' },
      { id: 'c', text: '{t | ∃p ∈ Singer (t[Experience]=p[Experience] ∧ p[Singer]>20)}' },
      { id: 'd', text: '{t | ∃p ∈ Singer (t[SID]=p[SID] ∧ p[Experience]>20)}' }
    ],
    correctOptionId: 'd',
    explanation: 'Standard TRC syntax: {t | ∃p ∈ Singer (t[SID]=p[SID] ∧ p[Experience]>20)} binds tuple t to target SID satisfying the experience predicate.'
  },
  {
    id: 26,
    assignment: 3,
    assignmentTitle: 'Assignment 3',
    topic: 'Attribute Inheritance in Specialization',
    question: 'In an ER diagram hierarchy where ANIMALS specializes into CARNIVORES, which in turn specializes into DOGS: Which statement is TRUE?',
    options: [
      { id: 'a', text: 'DOGS inherit the attributes of CARNIVORES but not of ANIMALS.' },
      { id: 'b', text: 'DOGS inherit the attributes of CARNIVORES and ANIMALS.' },
      { id: 'c', text: 'CARNIVORES inherit the attributes of DOGS.' },
      { id: 'd', text: 'ANIMALS inherit the attributes of all subclasses.' }
    ],
    correctOptionId: 'b',
    explanation: 'By the rule of specialization and class hierarchy, a subclass inherits all attributes from its direct superclass and all ancestor superclasses.'
  },
  {
    id: 27,
    assignment: 3,
    assignmentTitle: 'Assignment 3',
    topic: 'Domain Relational Calculus (DRC)',
    question: 'For relation R = (A, B), what is the equivalent relational algebra expression for DRC query: {< a > | ∃b ( < a, b > ∈ r ∧ b = 15 )}?',
    options: [
      { id: 'a', text: 'ΠA (σB=15 (r))' },
      { id: 'b', text: 'ΠB=15 (r)' },
      { id: 'c', text: 'σB=15 (r)' },
      { id: 'd', text: 'ΠA,B (σA=15 (r))' }
    ],
    correctOptionId: 'a',
    explanation: 'The predicate b = 15 translates to selection σB=15(r), and < a > specifies projection on attribute A, giving ΠA(σB=15(r)).'
  },
  {
    id: 28,
    assignment: 3,
    assignmentTitle: 'Assignment 3',
    topic: 'SQL Database Triggers',
    question: 'Given trigger: CREATE TRIGGER delete_trigger AFTER DELETE ON Presentation REFERENCING OLD ROW AS old_row FOR EACH ROW BEGIN DELETE FROM Schedule WHERE Schedule.Topic NOT IN (SELECT Topic FROM Schedule WHERE P_no <> old_row.P_no) END; What does it execute?',
    options: [
      { id: 'a', text: 'Executed automatically upon deletion of Presenter and deletes corresponding orphaned rows from Schedule.' },
      { id: 'b', text: 'Executed upon deletion of a Topic and deletes from Presentation.' },
      { id: 'c', text: 'Executed upon insertion into Presentation.' },
      { id: 'd', text: 'Executed before update on Schedule.' }
    ],
    correctOptionId: 'a',
    explanation: 'It is an AFTER DELETE trigger on Presentation that cleans up topics from Schedule that are no longer presented by any remaining presenter.'
  },
  {
    id: 29,
    assignment: 3,
    assignmentTitle: 'Assignment 3',
    topic: 'Embedded SQL Host Variables',
    question: 'In Embedded SQL within a host language (C/Java), how must host variables (e.g. monthly_budget, target_month) be referenced inside an SQL query?',
    options: [
      { id: 'a', text: 'WHERE PRICE > monthly_budget AND MONTH = target_month' },
      { id: 'b', text: 'WHERE PRICE > monthly_budget AND MONTH = :target_month' },
      { id: 'c', text: 'WHERE PRICE > :monthly_budget' },
      { id: 'd', text: 'WHERE PRICE > :monthly_budget AND MONTH = :target_month' }
    ],
    correctOptionId: 'd',
    explanation: 'In Embedded SQL, variables declared in the host language must be prefixed with a colon (:) to distinguish them from database column names.'
  },
  {
    id: 30,
    assignment: 3,
    assignmentTitle: 'Assignment 3',
    topic: 'Complex Relational Algebra Intersections',
    question: 'In Concerts(CName, TheatrID, HallNo, Event, Genres, Showtime, ShowDay), what is produced by: ΠCName(σHallNo>2 ∧ Genres=\'Folk\'(Concerts)) ∩ ΠCName(σEvent=\'Recorded\'(Concerts))?',
    options: [
      { id: 'a', text: 'Bob Dylan' },
      { id: 'b', text: 'The Miliputs and Pancham' },
      { id: 'c', text: 'Bitkel asor' },
      { id: 'd', text: 'Only The Miliputs' }
    ],
    correctOptionId: 'b',
    explanation: 'HallNo>2 with Folk produces {The Miliputs, Pancham}. Both of these also appear as Recorded events, so their intersection produces both.'
  },

  // ==================== ASSIGNMENT 4 (Questions 31 to 40) ====================
  {
    id: 31,
    assignment: 4,
    assignmentTitle: 'Assignment 4',
    topic: 'Armstrong\'s Axioms',
    question: 'Given dependencies ConfID → Subject and {Admin, Subject} → Participants. According to which inference rule does {ConfID, ConfLink} → Subject hold?',
    options: [
      { id: 'a', text: 'Augmentation' },
      { id: 'b', text: 'Decomposition' },
      { id: 'c', text: 'Transitivity' },
      { id: 'd', text: 'Pseudo-transitivity' }
    ],
    correctOptionId: 'a',
    explanation: 'Augmentation states that if X → Y holds, then XZ → YZ holds (and decomposing yields XZ → Y). Adding ConfLink to ConfID is augmentation.'
  },
  {
    id: 32,
    assignment: 4,
    assignmentTitle: 'Assignment 4',
    topic: 'Functional Dependencies from Data Instances',
    question: 'In Market(MarketName, Product, Stock), multiple markets sell identical products with different stocks. Which functional dependency holds?',
    options: [
      { id: 'a', text: 'MarketName → {Product, Stock}' },
      { id: 'b', text: '{MarketName, Product} → Stock' },
      { id: 'c', text: '{Stock, MarketName} → Product' },
      { id: 'd', text: '{Product} → MarketName' }
    ],
    correctOptionId: 'b',
    explanation: 'Each distinct pair of (MarketName, Product) has exactly one unique Stock value, so {MarketName, Product} functionally determines Stock.'
  },
  {
    id: 33,
    assignment: 4,
    assignmentTitle: 'Assignment 4',
    topic: 'Boyce-Codd Normal Form (BCNF)',
    question: 'In Smartphone(model, name, manufacturer, battery) with FDs: model → name, model → manufacturer, battery. Identify the INCORRECT statement:',
    options: [
      { id: 'a', text: 'Smartphone is in First Normal Form' },
      { id: 'b', text: 'Smartphone is in Second Normal Form' },
      { id: 'c', text: 'Smartphone is in BCNF' },
      { id: 'd', text: 'Smartphone is not normalized' }
    ],
    correctOptionId: 'd',
    explanation: 'The candidate key is model, and for every FD the LHS is a superkey. Therefore the relation is already in BCNF (and hence 1NF, 2NF, 3NF). Stating it is not normalized is incorrect.'
  },
  {
    id: 34,
    assignment: 4,
    assignmentTitle: 'Assignment 4',
    topic: '2NF vs 3NF and Transitive Dependencies',
    question: 'Which set of Functional Dependencies ensures that relation VirtualConf is in 2NF but NOT in 3NF?',
    options: [
      { id: 'a', text: 'ConfID → {ConfLink, Subject}, ConfLink → Participants, Admin → Subject' },
      { id: 'b', text: '{ConfID, ConfLink} → {Subject, Admin, Participants}' },
      { id: 'c', text: '{ConfID, ConfLink} → {Subject, Admin, Participants}, Admin → ConfLink' },
      { id: 'd', text: '{ConfID, Admin} → {ConfLink, Subject}, ConfLink → Participants' }
    ],
    correctOptionId: 'd',
    explanation: 'Key is {ConfID, Admin}. No partial dependency exists (so it is 2NF). But ConfLink → Participants introduces a transitive dependency of non-prime attributes, violating 3NF.'
  },
  {
    id: 35,
    assignment: 4,
    assignmentTitle: 'Assignment 4',
    topic: 'Candidate Keys and Schema Modification',
    question: 'Measurement has keys K1={device, sensor}, K2={dataform, sensor}, K3={dataform, delay, status}. To make sensor alone a candidate key, what attribute must be added to RHS of FD2: sensor → {delay, status}?',
    options: [
      { id: 'a', text: 'X=dataform or X=device to RHS of FD2' },
      { id: 'b', text: 'X=delay to FD1' },
      { id: 'c', text: 'X=uprange to FD3' },
      { id: 'd', text: 'No changes required' }
    ],
    correctOptionId: 'a',
    explanation: 'K1 ∩ K2 = sensor. If sensor can determine either device or dataform directly, its closure will encompass all attributes, making it a candidate key.'
  },
  {
    id: 36,
    assignment: 4,
    assignmentTitle: 'Assignment 4',
    topic: 'Equivalence and Covering of FD Sets',
    question: 'Given C1 = {{Vehicle, Color} → Capacity, RegNo → {Vehicle, Capacity, Owner}} and C2 = {Vehicle → {Color, Capacity}, RegNo → {Vehicle, Owner}}. Which statement is TRUE?',
    options: [
      { id: 'a', text: 'Neither C1 covers C2 nor C2 covers C1' },
      { id: 'b', text: 'C2 covers C1 but C1 does not cover C2' },
      { id: 'c', text: 'C1 covers C2 but C2 does not cover C1' },
      { id: 'd', text: 'Both C1 covers C2 and C2 covers C1' }
    ],
    correctOptionId: 'b',
    explanation: 'Vehicle → {Color, Capacity} in C2 cannot be derived from C1 because (Vehicle)+ under C1 is just {Vehicle}. However, all FDs of C1 can be derived from C2.'
  },
  {
    id: 37,
    assignment: 4,
    assignmentTitle: 'Assignment 4',
    topic: 'Attribute Closure Calculation',
    question: 'In relation R with F = { m→n, np→g, o→p, q→p, n→q }, what is the attribute closure (n)+?',
    options: [
      { id: 'a', text: '(n, m, q, p, g)' },
      { id: 'b', text: '(n, q, p, g)' },
      { id: 'c', text: '(n, o, p, q)' },
      { id: 'd', text: '(n, q, g, o)' }
    ],
    correctOptionId: 'b',
    explanation: 'Start with {n}. Using n→q gives {n, q}. Using q→p gives {n, q, p}. Using np→g gives {n, q, p, g}. Thus (n)+ = {n, q, p, g}.'
  },
  {
    id: 38,
    assignment: 4,
    assignmentTitle: 'Assignment 4',
    topic: 'Extraneous Attributes & Canonical Cover',
    question: 'In F = {FD1: {sensor, device, status} → {dataform, uprange, lowrange}, FD2: sensor → {delay, status}, FD3: ...}, which FD will NOT be present in the Canonical Cover?',
    options: [
      { id: 'a', text: '{sensor, device, status} → {dataform, uprange, lowrange}' },
      { id: 'b', text: 'sensor → {delay, status}' },
      { id: 'c', text: '{status, delay, dataform} → {sensor, device}' },
      { id: 'd', text: '{sensor, device} → {dataform, uprange, lowrange}' }
    ],
    correctOptionId: 'a',
    explanation: 'Because sensor → status (via FD2), status is extraneous on the LHS of FD1 and must be eliminated, resulting in {sensor, device} → {dataform, uprange, lowrange}.'
  },
  {
    id: 39,
    assignment: 4,
    assignmentTitle: 'Assignment 4',
    topic: 'Lossless-Join & Dependency Preservation',
    question: 'VirtualConf is decomposed into VirtualConf1(ConfID, ConfLink, Admin, Subject) and VirtualConf2(ConfID, Admin, Day, Participants). What is true about this decomposition?',
    options: [
      { id: 'a', text: 'Both lossless and dependency preserving.' },
      { id: 'b', text: 'Neither lossless nor dependency preserving.' },
      { id: 'c', text: 'Lossless but not dependency preserving.' },
      { id: 'd', text: 'Lossy but dependency preserving.' }
    ],
    correctOptionId: 'c',
    explanation: 'The common attributes {ConfID, Admin} form a candidate key in VirtualConf1, making the join lossless. However, FD4 ({ConfLink, Subject} → {Day, Admin}) spans both relations and cannot be checked in any single table, violating dependency preservation.'
  },
  {
    id: 40,
    assignment: 4,
    assignmentTitle: 'Assignment 4',
    topic: 'Multivalued Dependencies (4NF)',
    question: 'A Person can have many hobbies and can speak many languages independently. Which dependencies exist?',
    options: [
      { id: 'a', text: 'Pname →→ Hobby and Pname →→ Language' },
      { id: 'b', text: 'Pname, Hobby →→ Language' },
      { id: 'c', text: 'Pname → Hobby' },
      { id: 'd', text: 'Hobby, Language → Pname' }
    ],
    correctOptionId: 'a',
    explanation: 'When two independent multi-valued attributes depend only on the primary key entity, multivalued dependencies Pname →→ Hobby and Pname →→ Language hold.'
  },

  // ==================== ASSIGNMENT 5 (Questions 41 to 50) ====================
  {
    id: 41,
    assignment: 5,
    assignmentTitle: 'Assignment 5',
    topic: 'URL Structure & Web Architecture',
    question: 'In the URL https://onlinecourses.nptel.ac.in/e-learning/, which statement is correct?',
    options: [
      { id: 'a', text: 'The first part \'https\' is called the path name.' },
      { id: 'b', text: 'The second part \'onlinecourses.nptel.ac.in\' is called the domain name.' },
      { id: 'c', text: 'The part \'ac.in\' is called the sub-domain name.' },
      { id: 'd', text: 'The rest \'/e-learning\' is called a Uniform Resource Identifier.' }
    ],
    correctOptionId: 'b',
    explanation: 'https is the protocol, onlinecourses.nptel.ac.in is the fully qualified domain name, and /e-learning/ is the resource path.'
  },
  {
    id: 42,
    assignment: 5,
    assignmentTitle: 'Assignment 5',
    topic: 'Web Services & REST APIs',
    question: 'Identify the correct statement regarding modern Web Services:',
    options: [
      { id: 'a', text: 'REST is a type of Web Service architecture.' },
      { id: 'b', text: 'REST and JSON cannot work together.' },
      { id: 'c', text: 'Data cannot be accessed using remote procedure calls on the web.' },
      { id: 'd', text: 'REST requires XML and rejects JSON.' }
    ],
    correctOptionId: 'a',
    explanation: 'REST (Representational State Transfer) is a widely adopted web service architectural style that commonly utilizes JSON for lightweight payload serialization.'
  },
  {
    id: 43,
    assignment: 5,
    assignmentTitle: 'Assignment 5',
    topic: 'Disk Reliability & SAN Architecture',
    question: 'Which statement regarding disk storage reliability metrics is INCORRECT?',
    options: [
      { id: 'a', text: 'Disk controller acts as an interface between computer system and disk drive hardware.' },
      { id: 'b', text: 'When a sector is bad, the disk controller remaps the logical sector to a spare physical sector.' },
      { id: 'c', text: 'Mean time to failure (MTTF) is the maximum time a disk can run continuously.' },
      { id: 'd', text: 'Storage Area Networks connect high numbers of disks over high-speed networks to servers.' }
    ],
    correctOptionId: 'c',
    explanation: 'MTTF (Mean Time To Failure) represents the statistical AVERAGE operational time before a disk fails, not the maximum possible time.'
  },
  {
    id: 44,
    assignment: 5,
    assignmentTitle: 'Assignment 5',
    topic: 'Magnetic Disk Sector Calculation',
    question: 'A 512 GB magnetic disk has 256 surfaces, 1024 tracks per surface, and 512 sectors per track. What is the size of one sector?',
    options: [
      { id: 'a', text: '512 bytes' },
      { id: 'b', text: '1 KB' },
      { id: 'c', text: '2 KB' },
      { id: 'd', text: '4 KB' }
    ],
    correctOptionId: 'd',
    explanation: 'Total sectors = 256 × 1024 × 512 = 2^8 × 2^10 × 2^9 = 2^27 sectors. Total capacity = 512 GB = 2^39 bytes. Sector size = 2^39 / 2^27 = 2^12 bytes = 4 KB.'
  },
  {
    id: 45,
    assignment: 5,
    assignmentTitle: 'Assignment 5',
    topic: 'RAID 1 Mirroring Usable Capacity',
    question: 'A RAID 1 (mirroring) system uses 8 disks where each disk has a capacity of 2 TB. What is the usable storage capacity?',
    options: [
      { id: 'a', text: '16 TB' },
      { id: 'b', text: '8 TB' },
      { id: 'c', text: '4 TB' },
      { id: 'd', text: '2 TB' }
    ],
    correctOptionId: 'b',
    explanation: 'RAID 1 creates an exact mirror of data, storing two copies. Total raw capacity = 8 × 2 TB = 16 TB. Usable capacity = 16 TB / 2 = 8 TB.'
  },
  {
    id: 46,
    assignment: 5,
    assignmentTitle: 'Assignment 5',
    topic: 'System Availability Calculation',
    question: 'What is the availability of a RAID system if MTBF = 25 days and MTTR = 20 hours?',
    options: [
      { id: 'a', text: '96.77%' },
      { id: 'b', text: '96.02%' },
      { id: 'c', text: '58.14%' },
      { id: 'd', text: '30.25%' }
    ],
    correctOptionId: 'a',
    explanation: 'MTBF = 25 × 24 = 600 hours. Availability = MTBF / (MTBF + MTTR) = 600 / (600 + 20) = 600 / 620 ≈ 96.77%.'
  },
  {
    id: 47,
    assignment: 5,
    assignmentTitle: 'Assignment 5',
    topic: 'ER Modeling Cardinality',
    question: 'In a competition, participants participate in only one group, while each group can have multiple participants. Which statement is INCORRECT?',
    options: [
      { id: 'a', text: 'Entity Group will not have any primary key.' },
      { id: 'b', text: 'Participate will be a one-to-many relationship between Group and Participants.' },
      { id: 'c', text: 'Participate will be a many-to-many relationship.' },
      { id: 'd', text: 'GName can be the foreign key in Participant table.' }
    ],
    correctOptionId: 'a',
    explanation: 'Every entity set must have a primary key (Group has unique GName). Stating that Group will not have any primary key is false.'
  },
  {
    id: 48,
    assignment: 5,
    assignmentTitle: 'Assignment 5',
    topic: 'Lossless Schema Refinement',
    question: 'In DrawingCompetition(paintId, pNo, topic, pName, painter, year, materials) with paintId → pName, topic and pNo → painter, materials: Which refined schema allows lossless rejoining?',
    options: [
      { id: 'a', text: 'Painter(pNo, painter, materials), DrawingCompetition(paintId, topic, pName, materials)' },
      { id: 'b', text: 'Painter(pNo, painter, materials), DrawingCompetition(paintId, topic, pName, year)' },
      { id: 'c', text: 'Painter(pNo, painter, materials), Domain(topic, year)' },
      { id: 'd', text: 'Painter(pNo, painter, materials), DrawingCompetition(paintId, pNo, topic, pName, year)' }
    ],
    correctOptionId: 'd',
    explanation: 'Option (d) preserves pNo as a common attribute (foreign key in DrawingCompetition referencing Painter), enabling a natural lossless join back to the original relation.'
  },
  {
    id: 49,
    assignment: 5,
    assignmentTitle: 'Assignment 5',
    topic: 'Buffer Replacement (LRU Strategy)',
    question: 'An OS allocates 3 memory buffer blocks using LRU. For access sequence: 12, 9, 17, 9, 3, 9, 12, 17, 11: What is the state of the 3 buffer blocks after servicing \'11\'?',
    options: [
      { id: 'a', text: '12 9 11' },
      { id: 'b', text: '17 9 11' },
      { id: 'c', text: '11 9 12' },
      { id: 'd', text: '17 11 12' }
    ],
    correctOptionId: 'd',
    explanation: 'Tracking LRU replacements: after servicing 12, 17, block 9 was least recently used before 11, so 11 replaces 9, leaving {17, 11, 12}.'
  },
  {
    id: 50,
    assignment: 5,
    assignmentTitle: 'Assignment 5',
    topic: 'Block Capacity and Record Packing',
    question: 'A sequential file has fixed record size 30 bytes. Disk block is 512 bytes with an 18-byte block pointer. Records do not cross block boundaries. Max records per block?',
    options: [
      { id: 'a', text: '14' },
      { id: 'b', text: '16' },
      { id: 'c', text: '17' },
      { id: 'd', text: '18' }
    ],
    correctOptionId: 'b',
    explanation: 'Available space = 512 − 18 = 494 bytes. Records per block = ⌊494 / 30⌋ = 16 records.'
  },

  // ==================== ASSIGNMENT 6 (Questions 51 to 60) ====================
  {
    id: 51,
    assignment: 6,
    assignmentTitle: 'Assignment 6',
    topic: 'Secondary Indexing Requirements',
    question: 'A relation Smartphone(IMEI, model, manufacturer) has 100,000 records sorted physically by IMEI. Users frequently search by model. What type of index should be created?',
    options: [
      { id: 'a', text: 'Primary indexing' },
      { id: 'b', text: 'Secondary indexing' },
      { id: 'c', text: 'Clustering indexing' },
      { id: 'd', text: 'Multilevel indexing only' }
    ],
    correctOptionId: 'b',
    explanation: 'Because the data file is ordered by IMEI, searching on a non-ordering attribute like model requires a secondary index pointing to candidate record addresses.'
  },
  {
    id: 52,
    assignment: 6,
    assignmentTitle: 'Assignment 6',
    topic: 'B-Tree vs B+ Tree Differences',
    question: 'Identify the correct statement comparing B+ Trees and B-Trees:',
    options: [
      { id: 'a', text: 'In B+ Tree keys and records are stored in both internal nodes and leaf nodes.' },
      { id: 'b', text: 'In B-Tree data is stored only in leaf nodes.' },
      { id: 'c', text: 'Sequential access is faster in B+ Tree as leaf nodes are linked.' },
      { id: 'd', text: 'Sequential access is faster in B-Tree.' }
    ],
    correctOptionId: 'c',
    explanation: 'In B+ trees, all data records are in leaf nodes and leaf nodes are linked sequentially with pointers, making range and sequential scans significantly faster.'
  },
  {
    id: 53,
    assignment: 6,
    assignmentTitle: 'Assignment 6',
    topic: 'Sparse Index Sizing',
    question: 'A database has 12,000 records stored in sorted order. Each disk block holds 50 records. A sparse index contains 2 entries per data block. How many index entries are needed?',
    options: [
      { id: 'a', text: '50' },
      { id: 'b', text: '240' },
      { id: 'c', text: '480' },
      { id: 'd', text: '12000' }
    ],
    correctOptionId: 'c',
    explanation: 'Number of data blocks = 12000 / 50 = 240 blocks. With 2 index entries per block, total index entries = 240 × 2 = 480 entries.'
  },
  {
    id: 54,
    assignment: 6,
    assignmentTitle: 'Assignment 6',
    topic: '2-3-4 Tree Key Insertion',
    question: 'Insert keys 11, 24, 31, 38, 45, 51, 52, 59, 66, 73 into an empty 2-3-4 tree. How many 3-nodes (nodes with 2 keys) will be in the final tree?',
    options: [
      { id: 'a', text: '3' },
      { id: 'b', text: '2' },
      { id: 'c', text: '1' },
      { id: 'd', text: '0' }
    ],
    correctOptionId: 'b',
    explanation: 'After all insertions and proactive 4-node splits, the tree has exactly two 3-nodes containing 2 keys each: [51 59] and [66 73].'
  },
  {
    id: 55,
    assignment: 6,
    assignmentTitle: 'Assignment 6',
    topic: 'Dense Index Block Sizing',
    question: 'A disk block holds either 6 data records or 15 key pointers. If a database contains 1200 records, how many total blocks are needed to store both data and dense index files?',
    options: [
      { id: 'a', text: '280' },
      { id: 'b', text: '260' },
      { id: 'c', text: '200' },
      { id: 'd', text: '90' }
    ],
    correctOptionId: 'a',
    explanation: 'Data file blocks = 1200 / 6 = 200 blocks. Dense index blocks (one entry per record) = 1200 / 15 = 80 blocks. Total = 200 + 80 = 280 blocks.'
  },
  {
    id: 56,
    assignment: 6,
    assignmentTitle: 'Assignment 6',
    topic: '2-3-4 Tree Search Comparisons',
    question: 'In a 2-3-4 tree with root [J], left child [C], right child [N, T]: how many comparisons are required to search for key \'M\'?',
    options: [
      { id: 'a', text: '2' },
      { id: 'b', text: '3' },
      { id: 'c', text: '4' },
      { id: 'd', text: '5' }
    ],
    correctOptionId: 'c',
    explanation: 'Compare with J (M > J) -> compare with N (M < N) -> go to child [K, L] -> compare with K (M > K) -> compare with L (M > L). Total = 4 comparisons.'
  },
  {
    id: 57,
    assignment: 6,
    assignmentTitle: 'Assignment 6',
    topic: 'Hash Bucket Placement Calculation',
    question: 'A database file is indexed with hashing where bucket size is 100 and hash function H(key) = (key ÷ 11) % 100. At what bucket location will key k = 21375 be placed?',
    options: [
      { id: 'a', text: '19' },
      { id: 'b', text: '43' },
      { id: 'c', text: '75' },
      { id: 'd', text: '94' }
    ],
    correctOptionId: 'b',
    explanation: '21375 ÷ 11 = 1943. 1943 % 100 = 43. Thus location = 43.'
  },
  {
    id: 58,
    assignment: 6,
    assignmentTitle: 'Assignment 6',
    topic: 'Bitmap Index Sizing & Distinct Values',
    question: 'A bitmap index on Product type has size 1 KB for a table with 512 rows. How many distinct Product types exist?',
    options: [
      { id: 'a', text: '4' },
      { id: 'b', text: '8' },
      { id: 'c', text: '16' },
      { id: 'd', text: '32' }
    ],
    correctOptionId: 'c',
    explanation: 'Bitmap size = N × m bits. 1 KB = 1024 × 8 = 8192 bits. With N = 512 rows, distinct values m = 8192 / 512 = 16.'
  },
  {
    id: 59,
    assignment: 6,
    assignmentTitle: 'Assignment 6',
    topic: 'B+ Tree Internal Node Block Size',
    question: 'In a B+ tree, child pointers are 8 bytes, search keys are 10 bytes, and internal node order is 57. What is the minimum standard block size?',
    options: [
      { id: 'a', text: '512 bytes' },
      { id: 'b', text: '1024 bytes' },
      { id: 'c', text: '2048 bytes' },
      { id: 'd', text: '4096 bytes' }
    ],
    correctOptionId: 'b',
    explanation: 'Block Size = (m × Pointer Size) + ((m − 1) × Key Size) = (57 × 8) + (56 × 10) = 456 + 560 = 1016 bytes. Rounded up to nearest power-of-2 block = 1024 bytes.'
  },
  {
    id: 60,
    assignment: 6,
    assignmentTitle: 'Assignment 6',
    topic: 'Bitmap Index Interval Verification',
    question: 'In a Customer relation with Age attribute, which bitmap interval definition is INCORRECT if A1 represents ages below 40 but fails to mark age 37 properly?',
    options: [
      { id: 'a', text: 'A1 is a bitmap index for Age below 40' },
      { id: 'b', text: 'A4 is a bitmap index for Age 30 and above' },
      { id: 'c', text: 'A3 is a bitmap index for Age 25 to below 50' },
      { id: 'd', text: 'All bitmaps are fully correct' }
    ],
    correctOptionId: 'a',
    explanation: 'Evaluating row values against bitmap bit vector confirms A1 has mismatching entries for ages below 40.'
  },

  // ==================== ASSIGNMENT 7 (Questions 61 to 70) ====================
  {
    id: 61,
    assignment: 7,
    assignmentTitle: 'Assignment 7',
    topic: 'Conflict and View Serializability',
    question: 'For a schedule S whose precedence graph contains no directed cycles, choose the correct statement:',
    options: [
      { id: 'a', text: 'The schedule is both view and conflict serializable.' },
      { id: 'b', text: 'The schedule is neither conflict nor view serializable.' },
      { id: 'c', text: 'The schedule is only view serializable.' },
      { id: 'd', text: 'The schedule is only conflict serializable.' }
    ],
    correctOptionId: 'a',
    explanation: 'An acyclic precedence graph guarantees conflict serializability. All conflict serializable schedules are also view serializable.'
  },
  {
    id: 62,
    assignment: 7,
    assignmentTitle: 'Assignment 7',
    topic: 'Topological Orderings of Precedence Graph',
    question: 'Given precedence edges T4 → T1, T1 → T2, T1 → T3, T1 → T5, and T2 → T3. How many conflict serializable serial schedules exist?',
    options: [
      { id: 'a', text: '2' },
      { id: 'b', text: '3' },
      { id: 'c', text: '4' },
      { id: 'd', text: '5' }
    ],
    correctOptionId: 'b',
    explanation: 'The topological orderings are: (1) T4→T1→T2→T3→T5, (2) T4→T1→T2→T5→T3, and (3) T4→T1→T5→T2→T3. Total = 3.'
  },
  {
    id: 63,
    assignment: 7,
    assignmentTitle: 'Assignment 7',
    topic: 'Wait-For Graph for Deadlock Detection',
    question: 'Transaction T1 waits for T3 and T4, T2 waits for T3, and T3 waits for T4. How are directed edges drawn in the wait-for graph?',
    options: [
      { id: 'a', text: 'Edges point from holding transaction to waiting transaction.' },
      { id: 'b', text: 'Edges form a cycle T1 → T2 → T3 → T1.' },
      { id: 'c', text: 'Directed edges: T1 → T3, T1 → T4, T2 → T3, and T3 → T4.' },
      { id: 'd', text: 'No edges are added until commit.' }
    ],
    correctOptionId: 'c',
    explanation: 'When Ti requests a data item held by Tj, a directed edge Ti → Tj is inserted in the wait-for graph.'
  },
  {
    id: 64,
    assignment: 7,
    assignmentTitle: 'Assignment 7',
    topic: 'Serial Schedule Equivalence',
    question: 'T1 updates A:=A-400, B:=B+400 while T2 updates A:=A-100, D:=D+100. Both transactions commute on A and modify disjoint items B and D. Which serial schedule is equivalent?',
    options: [
      { id: 'a', text: 'Only T1 followed by T2' },
      { id: 'b', text: 'Only T2 followed by T1' },
      { id: 'c', text: 'Both T1 followed by T2 and T2 followed by T1' },
      { id: 'd', text: 'Neither T1 followed by T2 nor T2 followed by T1' }
    ],
    correctOptionId: 'c',
    explanation: 'Because both transactions yield the exact same final state (A=500, B=900, D=400) under either order T1→T2 or T2→T1, both serial schedules are equivalent.'
  },
  {
    id: 65,
    assignment: 7,
    assignmentTitle: 'Assignment 7',
    topic: 'Lock Compatibility Matrix',
    question: 'Transaction T1 holds a lock on item A. Which lock request by transaction T2 will be granted immediately without waiting?',
    options: [
      { id: 'a', text: 'T1 holds Shared (S) lock on A, and T2 requests Shared (S) lock on A.' },
      { id: 'b', text: 'T1 holds Shared (S) lock on A, and T2 requests Exclusive (X) lock on A.' },
      { id: 'c', text: 'T1 holds Exclusive (X) lock on A, and T2 requests Shared (S) lock on A.' },
      { id: 'd', text: 'T1 holds Exclusive (X) lock on A, and T2 requests Exclusive (X) lock on A.' }
    ],
    correctOptionId: 'a',
    explanation: 'Shared locks are mutually compatible: multiple transactions can concurrently hold Shared (S) locks on the same data item.'
  },
  {
    id: 66,
    assignment: 7,
    assignmentTitle: 'Assignment 7',
    topic: 'Wait-Die Deadlock Prevention Scheme',
    question: 'Under the Wait-Die scheme, older transaction T1 (timestamp 8) requests an exclusive lock held by younger transaction T2 (timestamp 15). What happens?',
    options: [
      { id: 'a', text: 'Transaction T1 waits until transaction T2 releases the lock.' },
      { id: 'b', text: 'Transaction T1 is rolled back.' },
      { id: 'c', text: 'Transaction T2 is rolled back.' },
      { id: 'd', text: 'Both transactions are rolled back.' }
    ],
    correctOptionId: 'a',
    explanation: 'In Wait-Die: an OLDER transaction is allowed to WAIT for a younger transaction holding the lock (old waits, young dies).'
  },
  {
    id: 67,
    assignment: 7,
    assignmentTitle: 'Assignment 7',
    topic: 'Strict 2PL vs Rigorous 2PL Protocols',
    question: 'T1 releases shared lock S(A) before commit but holds exclusive lock X(B) until commit. T2 holds both S(B) and X(A) until commit. Which statement is TRUE?',
    options: [
      { id: 'a', text: 'T1 follows Rigorous 2PL, while T2 follows Strict 2PL.' },
      { id: 'b', text: 'T1 follows Strict 2PL, whereas T2 follows Rigorous 2PL.' },
      { id: 'c', text: 'Both T1 and T2 follow Rigorous 2PL.' },
      { id: 'd', text: 'Neither follows 2PL.' }
    ],
    correctOptionId: 'b',
    explanation: 'Strict 2PL requires only Exclusive locks to be held until commit (shared can be released early). Rigorous 2PL requires ALL locks (Shared & Exclusive) to be held until commit.'
  },
  {
    id: 68,
    assignment: 7,
    assignmentTitle: 'Assignment 7',
    topic: 'Deadlock Freedom in Locking Schedules',
    question: 'In schedules S1 and S2 where transactions acquire shared locks concurrently and release before incompatible exclusive requests: Are the schedules deadlock free?',
    options: [
      { id: 'a', text: 'Both S1 and S2 suffer from deadlock.' },
      { id: 'b', text: 'S1 suffers from deadlock, S2 does not.' },
      { id: 'c', text: 'S1 does not suffer from deadlock, S2 suffers from deadlock.' },
      { id: 'd', text: 'Neither S1 nor S2 will suffer from deadlock.' }
    ],
    correctOptionId: 'd',
    explanation: 'Because lock releases precede subsequent exclusive lock acquisitions and no circular waiting is formed, neither schedule suffers from deadlock.'
  },
  {
    id: 69,
    assignment: 7,
    assignmentTitle: 'Assignment 7',
    topic: 'Cascadeless vs Recoverable Schedules',
    question: 'In schedule S2, T2 reads X written by T1 before T1 commits, but T2 commits after T1. In S1, T2 reads X only after T1 commits. Which statement is FALSE?',
    options: [
      { id: 'a', text: 'Both S1 and S2 are Recoverable Schedules.' },
      { id: 'b', text: 'S1 is a Strict Schedule.' },
      { id: 'c', text: 'S2 is a Recoverable Schedule, but not a Cascadeless Schedule.' },
      { id: 'd', text: 'S1 is a Recoverable Schedule, whereas S2 is a Cascadeless Schedule.' }
    ],
    correctOptionId: 'd',
    explanation: 'S2 is NOT cascadeless because T2 reads uncommitted data from T1. Saying S2 is cascadeless is false.'
  },
  {
    id: 70,
    assignment: 7,
    assignmentTitle: 'Assignment 7',
    topic: 'View Serializability Analysis',
    question: 'In schedule S, final writes on X and Y are made by T1, initial read of X by T3 is updated by T2, and T2 write is read by T1. How many view serializable serial orders exist?',
    options: [
      { id: 'a', text: '1 (T3 → T2 → T1)' },
      { id: 'b', text: '2' },
      { id: 'c', text: '3' },
      { id: 'd', text: '4' }
    ],
    correctOptionId: 'a',
    explanation: 'Dependencies force: T3 before T2 (read-update), T2 before T1 (write-read), and T1 last (final writes). Only 1 valid serial order: T3 → T2 → T1.'
  },

  // ==================== ASSIGNMENT 8 (Questions 71 to 80) ====================
  {
    id: 71,
    assignment: 8,
    assignmentTitle: 'Assignment 8',
    topic: 'Immediate Modification Crash Recovery',
    question: 'In an immediate database modification scheme with log records for T0, T1, T2, T3, T4 and checkpoint{T1, T2}. If a crash occurs after step 14, which value is restored for C?',
    options: [
      { id: 'a', text: 'After recovery completion, value of B will be 600.' },
      { id: 'b', text: 'After recovery completion, value of C will be 1500.' },
      { id: 'c', text: 'After recovery completion, value of D will be 800.' },
      { id: 'd', text: 'After recovery completion, value of E will be 1000.' }
    ],
    correctOptionId: 'b',
    explanation: 'T2 committed after checkpoint, so it is in the Redo list. Redoing T2 sets C to its new logged value 1500. Uncommitted T1 is undone, reverting B to old value 600.'
  },
  {
    id: 72,
    assignment: 8,
    assignmentTitle: 'Assignment 8',
    topic: 'Redo and Undo Transaction Lists',
    question: 'T5 committed before checkpoint{T6}. T6 committed after checkpoint. T7 and T9 started but did not commit before crash. T8 committed before crash. Identify the recovery actions:',
    options: [
      { id: 'a', text: 'No Action: T5; Redo: T7, T8; Undo: T6, T9' },
      { id: 'b', text: 'No Action: T6; Redo: T7, T8; Undo: T5, T9' },
      { id: 'c', text: 'No Action: T5; Redo: T7, T9; Undo: T6, T8' },
      { id: 'd', text: 'No Action: T5; Redo: T6, T8; Undo: T7, T9' }
    ],
    correctOptionId: 'd',
    explanation: 'T5 committed before checkpoint (No Action). T6 and T8 committed after checkpoint (Redo). Active uncommitted T7 and T9 must be undone (Undo).'
  },
  {
    id: 73,
    assignment: 8,
    assignmentTitle: 'Assignment 8',
    topic: 'Query Evaluation Plan Cost Estimation',
    question: 'Estimate query evaluation cost if 8000 blocks are transferred (tT = 5 ms) and 40 disk seeks are required (tS = 0.5 s):',
    options: [
      { id: 'a', text: '40 Seconds' },
      { id: 'b', text: '50 Seconds' },
      { id: 'c', text: '60 Seconds' },
      { id: 'd', text: '70 Seconds' }
    ],
    correctOptionId: 'c',
    explanation: 'Cost = (8000 × 0.005 s) + (40 × 0.5 s) = 40 s + 20 s = 60 Seconds.'
  },
  {
    id: 74,
    assignment: 8,
    assignmentTitle: 'Assignment 8',
    topic: 'Nested-Loop Join Block Transfers',
    question: 'Natural join of Vehicle (5000 records, 50 blocks) and Service_Record (1000 records, 10 blocks) using Nested-loop join with Vehicle as outer relation. Worst-case block transfers?',
    options: [
      { id: 'a', text: '5000 block transfers' },
      { id: 'b', text: '50010 block transfers' },
      { id: 'c', text: '50050 block transfers' },
      { id: 'd', text: '60060 block transfers' }
    ],
    correctOptionId: 'c',
    explanation: 'Worst-case block transfers = n_outer × b_inner + b_outer = 5000 × 10 + 50 = 50,050 block transfers.'
  },
  {
    id: 75,
    assignment: 8,
    assignmentTitle: 'Assignment 8',
    topic: 'Checkpoint Failure Recovery Rules',
    question: 'T1, T2, T3 committed before last checkpoint. T4 committed after checkpoint. T5 and T6 were active at crash. Which actions are required?',
    options: [
      { id: 'a', text: 'T1, T2, T3 can be ignored; T5 and T6 undone; Only T4 redone.' },
      { id: 'b', text: 'T5 and T6 need to be redone.' },
      { id: 'c', text: 'T4 needs to be undone.' },
      { id: 'd', text: 'All transactions must be redone.' }
    ],
    correctOptionId: 'a',
    explanation: 'Transactions committed before the checkpoint are safe (ignored). Transactions committed since checkpoint are redone (T4). Incomplete transactions are undone (T5, T6).'
  },
  {
    id: 76,
    assignment: 8,
    assignmentTitle: 'Assignment 8',
    topic: 'Heuristic Query Optimization (Early Selection)',
    question: 'In query tree optimization, why is pushing selection σ(service_cost > 5000) down to Service_Record before natural join more efficient?',
    options: [
      { id: 'a', text: 'It creates a cartesian product instead.' },
      { id: 'b', text: 'Performing selection early reduces the number of tuples participating in the join.' },
      { id: 'c', text: 'Selection removes indexes.' },
      { id: 'd', text: 'Both trees require identical execution time.' }
    ],
    correctOptionId: 'b',
    explanation: 'Heuristic query optimization applies selection as early as possible to drastically reduce intermediate relation size before expensive join operations.'
  },
  {
    id: 77,
    assignment: 8,
    assignmentTitle: 'Assignment 8',
    topic: 'Relational Algebra Query Equivalence',
    question: 'Given Q1: σmodel=\'SUV\'(σservice_cost>5000(R)) and Q2: σmodel=\'SUV\' ∧ service_cost>5000(R). Are Q1 and Q2 equivalent?',
    options: [
      { id: 'a', text: 'Q1 is equivalent to Q2.' },
      { id: 'b', text: 'Q1 is not equivalent to Q2.' },
      { id: 'c', text: 'Q1 is equivalent only when R is empty.' },
      { id: 'd', text: 'Q2 produces a Cartesian product.' }
    ],
    correctOptionId: 'a',
    explanation: 'By the cascade rule of selection: σ_C1(σ_C2(R)) ≡ σ_{C1 ∧ C2}(R). Therefore Q1 and Q2 are strictly equivalent.'
  },
  {
    id: 78,
    assignment: 8,
    assignmentTitle: 'Assignment 8',
    topic: 'B+ Tree Concurrency Logical Undo',
    question: 'In an early lock release recovery system, operation O1 log record has (Y, -300), (Z, -400) before crash. What is the correct compensation sequence for recovery?',
    options: [
      { id: 'a', text: '⟨T1, Z, 500, 900⟩, ⟨T1, Y, 400, 700⟩, ⟨T1, abort⟩' },
      { id: 'b', text: '⟨T1, Z, 500, 900⟩, ⟨T1, Y, 400, 700⟩, ⟨T1, O1, operation-abort⟩' },
      { id: 'c', text: '⟨T1, Z, 900, 500⟩, ⟨T1, Y, 700, 400⟩, ⟨T1, X, 800⟩' },
      { id: 'd', text: '⟨T1, Z, 900, 500⟩, ⟨T1, Y, 700, 400⟩, ⟨T1, O1, operation-abort⟩, ⟨T1, X, 900⟩, ⟨T1, abort⟩' }
    ],
    correctOptionId: 'd',
    explanation: 'Scanning backward: logical undo deletes previous updates on Z (reverting to 500) and Y (reverting to 400), writes operation-abort, undoes X, and writes abort.'
  },
  {
    id: 79,
    assignment: 8,
    assignmentTitle: 'Assignment 8',
    topic: 'Selection Pushdown in Natural Joins',
    question: 'To optimize ΠArtifact_Name(σGallery_Name=\'Ancient\' ∧ Year_Acquired<1900(Artifact ⨝ Gallery)), where should the selection predicates be pushed?',
    options: [
      { id: 'a', text: 'Push Year_Acquired<1900 to Artifact, and Gallery_Name=\'Ancient\' to Gallery before join.' },
      { id: 'b', text: 'Push Gallery_Name=\'Ancient\' after join.' },
      { id: 'c', text: 'Keep all selections after join.' },
      { id: 'd', text: 'Apply selections only to Gallery.' }
    ],
    correctOptionId: 'a',
    explanation: 'Each selection predicate should be pushed down to its respective originating relation (Year_Acquired < 1900 to Artifact; Gallery_Name = \'Ancient\' to Gallery) before performing the join.'
  },
  {
    id: 80,
    assignment: 8,
    assignmentTitle: 'Assignment 8',
    topic: 'Distributive Property of Theta-Join over Difference',
    question: 'Consider the relational algebra expression (R1 ⨝θ R2) − (R1 ⨝θ R3). Which is an equivalent expression?',
    options: [
      { id: 'a', text: 'R1 ∩ (R2 ⨝θ R3)' },
      { id: 'b', text: '(R1 ⨝θ R2) − R3' },
      { id: 'c', text: 'R1 ⨝θ (R2 − R3)' },
      { id: 'd', text: '(R1 ⨝θ R2) ∩ (R1 ⨝θ R3)' }
    ],
    correctOptionId: 'c',
    explanation: 'By the algebraic distributive property of theta-join (⨝θ) over set difference (−): R1 ⨝θ (R2 − R3) = (R1 ⨝θ R2) − (R1 ⨝θ R3).'
  }
];
