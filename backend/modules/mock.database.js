
export let student = [
    { name: "John Doe", computerNumber: "STU123456", email: "john.doe@student.university.edu", password: "password123", borrowedBooks: [1], reservedBooks: [2], fines: 0.00 },
    { name: "Jane Smith", computerNumber: "STU654321", email: "jane.smith@student.university.edu", password: "password456", borrowedBooks: [], reservedBooks: [], fines: 5.00 },
    { name: "Michael Johnson", computerNumber: "STU987654", email: "michael.johnson@student.university.edu", password: "password789", borrowedBooks: [3], reservedBooks: [], fines: 0.00 },
    { name: "Emily Davis", computerNumber: "STU876543", email: "emily.davis@student.university.edu", password: "password321", borrowedBooks: [], reservedBooks: [1], fines: 0.00 },
    { name: "Chris Brown", computerNumber: "STU345678", email: "chris.brown@student.university.edu", password: "password555", borrowedBooks: [4], reservedBooks: [], fines: 2.00 },
    { name: "Olivia Wilson", computerNumber: "STU234567", email: "olivia.wilson@student.university.edu", password: "password666", borrowedBooks: [], reservedBooks: [], fines: 1.50 },
    { name: "Noah Miller", computerNumber: "STU112233", email: "noah.miller@student.university.edu", password: "password111", borrowedBooks: [5], reservedBooks: [], fines: 0.00 },
    { name: "Emma Moore", computerNumber: "STU223344", email: "emma.moore@student.university.edu", password: "password222", borrowedBooks: [], reservedBooks: [6], fines: 3.00 },
    { name: "Ava Taylor", computerNumber: "STU334455", email: "ava.taylor@student.university.edu", password: "password333", borrowedBooks: [], reservedBooks: [], fines: 0.00 },
    { name: "William Anderson", computerNumber: "STU445566", email: "william.anderson@student.university.edu", password: "password444", borrowedBooks: [7], reservedBooks: [], fines: 0.00 },
    { name: "Sophia Thomas", computerNumber: "STU556677", email: "sophia.thomas@student.university.edu", password: "password555", borrowedBooks: [], reservedBooks: [8], fines: 0.00 },
    { name: "Isabella Harris", computerNumber: "STU667788", email: "isabella.harris@student.university.edu", password: "password666", borrowedBooks: [], reservedBooks: [], fines: 5.00 },
    { name: "James Walker", computerNumber: "STU778899", email: "james.walker@student.university.edu", password: "password777", borrowedBooks: [9], reservedBooks: [], fines: 0.00 },
    { name: "Elijah Hall", computerNumber: "STU889900", email: "elijah.hall@student.university.edu", password: "password888", borrowedBooks: [], reservedBooks: [], fines: 0.00 },
    { name: "Liam Wright", computerNumber: "STU990011", email: "liam.wright@student.university.edu", password: "password999", borrowedBooks: [], reservedBooks: [10], fines: 0.00 },
    { name: "Charlotte Young", computerNumber: "STU001122", email: "charlotte.young@student.university.edu", password: "password000", borrowedBooks: [], reservedBooks: [], fines: 4.50 },
    { name: "Benjamin King", computerNumber: "STU112233", email: "benjamin.king@student.university.edu", password: "password1234", borrowedBooks: [11], reservedBooks: [], fines: 0.00 },
    { name: "Lucas Scott", computerNumber: "STU223344", email: "lucas.scott@student.university.edu", password: "password2345", borrowedBooks: [], reservedBooks: [], fines: 0.00 },
    { name: "Mia Green", computerNumber: "STU334455", email: "mia.green@student.university.edu", password: "password3456", borrowedBooks: [], reservedBooks: [12], fines: 1.00 },
    { name: "Amelia Adams", computerNumber: "STU445566", email: "amelia.adams@student.university.edu", password: "password4567", borrowedBooks: [], reservedBooks: [], fines: 2.00 }
];

export let librarians = [
    { id: 1, name: "Alice Johnson", email: "alice@university.edu", password: "adminpassword1", role: "admin" },
    { id: 2, name: "Bob Smith", email: "bob@university.edu", password: "adminpassword2", role: "admin" },
    { id: 3, name: "Sarah Thompson", email: "sarah@university.edu", password: "staffpassword1", role: "staff" },
    { id: 4, name: "David Brown", email: "david@university.edu", password: "staffpassword2", role: "staff" },
    { id: 5, name: "Linda Williams", email: "linda@university.edu", password: "staffpassword3", role: "staff" },
    { id: 6, name: "Paul Johnson", email: "paul@university.edu", password: "staffpassword4", role: "staff" },
    { id: 7, name: "Nancy Moore", email: "nancy@university.edu", password: "adminpassword3", role: "admin" },
    { id: 8, name: "Karen Lee", email: "karen@university.edu", password: "staffpassword5", role: "staff" },
    { id: 9, name: "Mark White", email: "mark@university.edu", password: "adminpassword4", role: "admin" },
    { id: 10, name: "Jessica Lewis", email: "jessica@university.edu", password: "staffpassword6", role: "staff" },
    { id: 11, name: "Christopher Harris", email: "chris@university.edu", password: "adminpassword5", role: "admin" },
    { id: 12, name: "Susan Clark", email: "susan@university.edu", password: "staffpassword7", role: "staff" },
    { id: 13, name: "Steven Walker", email: "steven@university.edu", password: "adminpassword6", role: "admin" },
    { id: 14, name: "Michelle Hall", email: "michelle@university.edu", password: "staffpassword8", role: "staff" },
    { id: 15, name: "Charles Allen", email: "charles@university.edu", password: "adminpassword7", role: "admin" },
    { id: 16, name: "Laura Young", email: "laura@university.edu", password: "staffpassword9", role: "staff" },
    { id: 17, name: "Matthew King", email: "matthew@university.edu", password: "adminpassword8", role: "admin" },
    { id: 18, name: "Emma Scott", email: "emma@university.edu", password: "staffpassword10", role: "staff" },
    { id: 19, name: "Patricia Green", email: "patricia@university.edu", password: "adminpassword9", role: "admin" },
    { id: 20, name: "Daniel Adams", email: "daniel@university.edu", password: "staffpassword11", role: "staff" }
];


export let books = [
    {  title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "9780743273565", availableCopies: 5 },
    {  title: "1984", author: "George Orwell", isbn: "9780451524935", availableCopies: 3 },
    {  title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "9780061120084", availableCopies: 4 },
    {  title: "The Catcher in the Rye", author: "J.D. Salinger", isbn: "9780316769488", availableCopies: 2 },
    {  title: "Pride and Prejudice", author: "Jane Austen", isbn: "9781503290563", availableCopies: 6 },
    {  title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "9780547928227", availableCopies: 5 },
    {  title: "Moby-Dick", author: "Herman Melville", isbn: "9781503280786", availableCopies: 3 },
    {  title: "War and Peace", author: "Leo Tolstoy", isbn: "9781853260629", availableCopies: 1 },
    {  title: "The Odyssey", author: "Homer", isbn: "9780143039952", availableCopies: 4 },
    {  title: "Jane Eyre", author: "Charlotte Brontë", isbn: "9780142437209", availableCopies: 2 },
    {  title: "The Picture of Dorian Gray", author: "Oscar Wilde", isbn: "9780141439570", availableCopies: 5 },
    {  title: "Brave New World", author: "Aldous Huxley", isbn: "9780060850524", availableCopies: 3 },
    {  title: "Fahrenheit 451", author: "Ray Bradbury", isbn: "9781451673319", availableCopies: 4 },
    {  title: "The Grapes of Wrath", author: "John Steinbeck", isbn: "9780143039433", availableCopies: 2 },
    {  title: "The Diary of a Young Girl", author: "Anne Frank", isbn: "9780553296983", availableCopies: 5 },
    {  title: "The Kite Runner", author: "Khaled Hosseini", isbn: "9781594631931", availableCopies: 3 },
    {  title: "The Alchemist", author: "Paulo Coelho", isbn: "9780061122415", availableCopies: 6 },
    {  title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", isbn: "9780439708180", availableCopies: 7 },
    {  title: "The Lord of the Rings", author: "J.R.R. Tolkien", isbn: "9780618640157", availableCopies: 2 },
    {  title: "The Fault in Our Stars", author: "John Green", isbn: "9780525478812", availableCopies: 4 }
];


export let borrowedBooks = [
    { id: 1, isbn: "9780743273565", studentId: "STU876543", borrowDate: "2024-09-01", dueDate: "2024-09-15", returnDate: null },
    { id: 2, isbn: "9780061120084", studentId: "STU345678", borrowDate: "2024-09-02", dueDate: "2024-09-16", returnDate: null },
    { id: 3, isbn: "9780316769488", studentId: "STU112233", borrowDate: "2024-09-03", dueDate: "2024-09-17", returnDate: null },
    { id: 4, isbn: "9781503290563", studentId: "STU654321", borrowDate: "2024-09-04", dueDate: "2024-09-18", returnDate: null },
    { id: 5, isbn: "9780547928227", studentId: "STU123456", borrowDate: "2024-09-05", dueDate: "2024-09-19", returnDate: null },
    { id: 6, isbn: "9781853260629", studentId: "STU556677", borrowDate: "2024-09-06", dueDate: "2024-09-20", returnDate: null },
    { id: 7, isbn: "9780143039952", studentId: "STU334455", borrowDate: "2024-09-07", dueDate: "2024-09-21", returnDate: null },
    { id: 8, isbn: "9780451524935", studentId: "STU223344", borrowDate: "2024-09-08", dueDate: "2024-09-22", returnDate: null },
    { id: 9, isbn: "9780061120084", studentId: "STU990011", borrowDate: "2024-09-09", dueDate: "2024-09-23", returnDate: null },
    { id: 10, isbn: "9780316769488", studentId: "STU445566", borrowDate: "2024-09-10", dueDate: "2024-09-24", returnDate: null },
    { id: 11, isbn: "9780451524935", studentId: "STU223344", borrowDate: "2024-09-11", dueDate: "2024-09-25", returnDate: null },
    { id: 12, isbn: "9781503290563", studentId: "STU778899", borrowDate: "2024-09-12", dueDate: "2024-09-26", returnDate: null },
    { id: 13, isbn: "9780061122415", studentId: "STU001122", borrowDate: "2024-09-13", dueDate: "2024-09-27", returnDate: null },
    { id: 14, isbn: "9780061122415", studentId: "STU889900", borrowDate: "2024-09-14", dueDate: "2024-09-28", returnDate: null },
    { id: 15, isbn: "9781853260629", studentId: "STU334455", borrowDate: "2024-09-15", dueDate: "2024-09-29", returnDate: null },
    { id: 16, isbn: "9780141439570", studentId: "STU123456", borrowDate: "2024-09-16", dueDate: "2024-09-30", returnDate: null },
    { id: 17, isbn: "9781451673319", studentId: "STU556677", borrowDate: "2024-09-17", dueDate: "2024-10-01", returnDate: null },
    { id: 18, isbn: "9780451524935", studentId: "STU778899", borrowDate: "2024-09-18", dueDate: "2024-10-02", returnDate: null },
    { id: 19, isbn: "9781503290563", studentId: "STU889900", borrowDate: "2024-09-19", dueDate: "2024-10-03", returnDate: null },
    { id: 20, isbn: "9780061120084", studentId: "STU223344", borrowDate: "2024-09-20", dueDate: "2024-10-04", returnDate: null }
];


export let reservedBooks = [
    { id: 1, isbn: "9780451524935", studentId: "STU876543", reserveDate: "2024-09-01", expirationDate: "2024-09-15" },
    { id: 2, isbn: "9780743273565", studentId: "STU345678", reserveDate: "2024-09-02", expirationDate: "2024-09-16" },
    { id: 3, isbn: "9781503290563", studentId: "STU112233", reserveDate: "2024-09-03", expirationDate: "2024-09-17" },
    { id: 4, isbn: "9780316769488", studentId: "STU654321", reserveDate: "2024-09-04", expirationDate: "2024-09-18" },
    { id: 5, isbn: "9780061120084", studentId: "STU123456", reserveDate: "2024-09-05", expirationDate: "2024-09-19" },
    { id: 6, isbn: "9781853260629", studentId: "STU556677", reserveDate: "2024-09-06", expirationDate: "2024-09-20" },
    { id: 7, isbn: "9780143039952", studentId: "STU334455", reserveDate: "2024-09-07", expirationDate: "2024-09-21" },
    { id: 8, isbn: "9780451524935", studentId: "STU223344", reserveDate: "2024-09-08", expirationDate: "2024-09-22" },
    { id: 9, isbn: "9780743273565", studentId: "STU990011", reserveDate: "2024-09-09", expirationDate: "2024-09-23" },
    { id: 10, isbn: "9780316769488", studentId: "STU445566", reserveDate: "2024-09-10", expirationDate: "2024-09-24" },
    { id: 11, isbn: "9780061120084", studentId: "STU223344", reserveDate: "2024-09-11", expirationDate: "2024-09-25" },
    { id: 12, isbn: "9781503290563", studentId: "STU778899", reserveDate: "2024-09-12", expirationDate: "2024-09-26" },
    { id: 13, isbn: "9780618640157", studentId: "STU001122", reserveDate: "2024-09-13", expirationDate: "2024-09-27" },
    { id: 14, isbn: "9780439708180", studentId: "STU889900", reserveDate: "2024-09-14", expirationDate: "2024-09-28" },
    { id: 15, isbn: "9781451673319", studentId: "STU334455", reserveDate: "2024-09-15", expirationDate: "2024-09-29" },
    { id: 16, isbn: "9780141439570", studentId: "STU123456", reserveDate: "2024-09-16", expirationDate: "2024-09-30" },
    { id: 17, isbn: "9781451673319", studentId: "STU556677", reserveDate: "2024-09-17", expirationDate: "2024-10-01" },
    { id: 18, isbn: "9780451524935", studentId: "STU778899", reserveDate: "2024-09-18", expirationDate: "2024-10-02" },
    { id: 19, isbn: "9781503290563", studentId: "STU889900", reserveDate: "2024-09-19", expirationDate: "2024-10-03" },
    { id: 20, isbn: "9780061120084", studentId: "STU223344", reserveDate: "2024-09-20", expirationDate: "2024-10-04" }
];

