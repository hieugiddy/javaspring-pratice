const COURSE_DATA = [
  // ============================================================
  // PHASE 1: NỀN TẢNG JAVA
  // ============================================================
  {
    id: "phase-1", title: "Nền tảng Java", icon: "☕",
    desc: "OOP, Collections, Stream API, Exception, Maven & Git",
    topics: [
      // --- OOP ---
      {
        id: "p1-oop", title: "Lập trình hướng đối tượng",
        lesson: [
          {type:"p",text:"OOP là nền tảng cốt lõi của Java. Bốn tính chất chính:"},
          {type:"ul",items:[
            "<b>Đóng gói (Encapsulation)</b>: Dùng <code>private</code> cho field, cung cấp getter/setter <code>public</code>.",
            "<b>Kế thừa (Inheritance)</b>: <code>class Dog extends Animal</code> — class con tái sử dụng class cha.",
            "<b>Đa hình (Polymorphism)</b>: Override (<code>@Override</code>) và Overload (cùng tên, khác tham số).",
            "<b>Trừu tượng (Abstraction)</b>: <code>abstract class</code> / <code>interface</code> — chỉ định nghĩa hợp đồng."
          ]},
          {type:"p",text:"💡 <b>SOLID Principles</b> — 5 nguyên lý thiết kế OOP:"},
          {type:"ul",items:[
            "<b>S</b>ingle Responsibility: Một class chỉ nên có một lý do để thay đổi.",
            "<b>O</b>pen/Closed: Mở cho extension, đóng cho modification.",
            "<b>L</b>iskov Substitution: Class con phải thay thế được class cha.",
            "<b>I</b>nterface Segregation: Nhiều interface nhỏ tốt hơn một interface lớn.",
            "<b>D</b>ependency Inversion: Phụ thuộc vào abstraction, không phụ thuộc vào concrete."
          ]},
          {type:"code",text:"// Ví dụ OOP + SOLID\ninterface Soundable {\n    void makeSound();\n}\n\nabstract class Animal implements Soundable {\n    protected String name;\n    \n    public Animal(String name) { this.name = name; }\n    \n    public void sleep() {\n        System.out.println(name + \" đang ngủ...\");\n    }\n}\n\nclass Dog extends Animal {\n    public Dog(String name) { super(name); }\n    \n    @Override\n    public void makeSound() {\n        System.out.println(name + \" sủa: Gâu gâu!\");\n    }\n}"}
        ],
        exercises: [
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Từ khoá nào dùng để class con kế thừa class cha?",options:["implements","extends","inherits","super"],answer:1,explanation:"extends — dùng để kế thừa class. implements dành cho interface."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Tính chất nào ẩn dữ liệu nội bộ?",options:["Kế thừa","Đa hình","Đóng gói","Trừu tượng"],answer:2,explanation:"Đóng gói (Encapsulation) — dùng private field + public getter/setter."},
          {type:"mcq",difficulty:"intermediate",badge:"Lý thuyết",question:"Nguyên lý SOLID nào nói 'một class chỉ nên có một lý do để thay đổi'?",options:["Single Responsibility","Open/Closed","Liskov Substitution","Interface Segregation"],answer:0,explanation:"S = Single Responsibility — mỗi class chỉ làm một việc."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Điền annotation: <code>public ___ void makeSound();</code> — method không có thân.",expectedKeywords:["abstract","abstract;","abstract void"],explanation:"Phương thức abstract không có implementation, class con bắt buộc phải override."},
          {type:"truefalse",difficulty:"basic",badge:"Đúng/Sai",question:"Interface trong Java có thể chứa phương thức có implementation (default method) từ Java 8?",answer:true,explanation:"Đúng! Java 8+ cho phép default method và static method trong interface."},
          {type:"code",difficulty:"advanced",badge:"Thực hành",question:"Viết một interface <code>Flyable</code> với method <code>void fly()</code> và một class <code>Bird</code> implement nó.",template:"// Viết interface Flyable với method void fly()\n// và class Bird implement Flyable\n\n// Code của bạn:\n",checks:[
            {regex:/interface\s+Flyable/,hint:"Cần định nghĩa interface Flyable"},
            {regex:/void\s+fly\s*\(\s*\)/,hint:"Cần method void fly()"},
            {regex:/class\s+Bird\s+implements\s+Flyable/,hint:"Class Bird cần implements Flyable"}
          ],explanation:"Interface định nghĩa hợp đồng, class implement cung cấp chi tiết."}
        ]
      },
      // --- Collections ---
      {
        id:"p1-collections",title:"Collections Framework",
        lesson:[
          {type:"p",text:"Java Collections Framework cung cấp các cấu trúc dữ liệu phổ biến. Ba interface chính: <b>List</b>, <b>Set</b>, <b>Map</b>."},
          {type:"ul",items:[
            "<b>List</b>: <code>ArrayList</code> (mảng động), <code>LinkedList</code> (danh sách liên kết) — có thứ tự, cho phép trùng.",
            "<b>Set</b>: <code>HashSet</code> (O(1)), <code>TreeSet</code> (có thứ tự, O(log n)) — không trùng.",
            "<b>Map</b>: <code>HashMap</code> (O(1)), <code>TreeMap</code> (có thứ tự), <code>LinkedHashMap</code> (giữ thứ tự chèn) — key-value."
          ]},
          {type:"p",text:"<b>So sánh hiệu năng (Big-O):</b>"},
          {type:"ul",items:[
            "ArrayList: get O(1), add O(1)*, remove O(n).",
            "LinkedList: get O(n), add O(1), remove O(1).",
            "HashMap: get/put O(1) — tốt nhất cho lookup.",
            "TreeMap: get/put O(log n) — cần thứ tự key."
          ]},
          {type:"code",text:"// Ví dụ Collections\nList<String> names = new ArrayList<>();\nnames.addAll(Arrays.asList(\"Alice\", \"Bob\", \"Charlie\"));\n\nMap<String, Integer> scores = new HashMap<>();\nscores.put(\"Alice\", 90);\nscores.put(\"Bob\", 85);\n\n// Duyệt Map\nscores.forEach((name, score) ->\n    System.out.println(name + \": \" + score));\n\n// Set (loại bỏ trùng)\nSet<Integer> unique = new HashSet<>(Arrays.asList(1,2,2,3,3));\n// unique = [1, 2, 3]"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Interface nào lưu key-value, key không trùng?",options:["List","Set","Map","Queue"],answer:2,explanation:"Map lưu cặp key-value, mỗi key là duy nhất."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Class nào có get O(1) và add O(1)* (amortized)?",options:["LinkedList","ArrayList","TreeMap","HashSet"],answer:1,explanation:"ArrayList có get O(1) nhờ mảng động, add O(1) amortized."},
          {type:"mcq",difficulty:"intermediate",badge:"Lý thuyết",question:"Set nào giữ các phần tử có thứ tự (sorted)?",options:["HashSet","LinkedHashSet","TreeSet","EnumSet"],answer:2,explanation:"TreeSet lưu phần tử theo thứ tự (dùng Red-Black Tree)."},
          {type:"fill",difficulty:"basic",badge:"Điền khuyết",question:"Hoàn thành: <code>List&lt;String&gt; list = new ___&lt;&gt;();</code> (phổ biến nhất)",expectedKeywords:["ArrayList","ArrayList()","ArrayList<>()"],explanation:"ArrayList là implement phổ biến nhất của List."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Phương thức nào thêm nhiều phần tử cùng lúc vào Collection?",expectedKeywords:["addAll","addAll()","addAll(Arrays.asList"],explanation:"Collection.addAll(Collection) thêm tất cả phần tử từ collection khác."},
          {type:"truefalse",difficulty:"basic",badge:"Đúng/Sai",question:"LinkedList có get(index) với độ phức tạp O(1)?",answer:false,explanation:"LinkedList có get O(n) — phải duyệt từ đầu đến index."},
          {type:"order",difficulty:"basic",badge:"Sắp xếp",question:"Sắp xếp thứ tự các bước để tạo một HashMap và in ra tất cả giá trị:",items:[
            "import java.util.*;",
            "Map<String, Integer> map = new HashMap<>();",
            "map.put(\"A\", 1); map.put(\"B\", 2);",
            "map.forEach((k, v) -> System.out.println(v));"
          ],answer:[0,1,2,3],explanation:"Import → Khởi tạo → Thêm dữ liệu → Duyệt và in."}
        ]
      },
      // --- Stream API ---
      {
        id:"p1-stream",title:"Stream API & Lambda",
        lesson:[
          {type:"p",text:"Stream API (Java 8+) xử lý collection theo phong cách functional — pipeline operations."},
          {type:"p",text:"<b>Lambda</b>: <code>(params) -> expression</code> — cách viết gọn anonymous function."},
          {type:"ul",items:[
            "<b>Intermediate operations</b> (trả về Stream mới): <code>filter()</code>, <code>map()</code>, <code>flatMap()</code>, <code>sorted()</code>, <code>distinct()</code>, <code>peek()</code>, <code>limit()</code>, <code>skip()</code>.",
            "<b>Terminal operations</b> (kết thúc pipeline): <code>collect()</code>, <code>forEach()</code>, <code>reduce()</code>, <code>count()</code>, <code>anyMatch()</code>, <code>allMatch()</code>, <code>findFirst()</code>, <code>findAny()</code>.",
            "<b>Method reference</b>: <code>Class::method</code> — vd: <code>String::toUpperCase</code>, <code>System.out::println</code>."
          ]},
          {type:"code",text:"record Person(String name, int age) {}\n\nList<Person> people = List.of(\n    new Person(\"Alice\", 22),\n    new Person(\"Bob\", 17),\n    new Person(\"Charlie\", 25)\n);\n\n// Lọc người >= 18 tuổi, lấy tên, sắp xếp\nList<String> adults = people.stream()\n    .filter(p -> p.age() >= 18)\n    .map(Person::name)\n    .sorted()\n    .collect(Collectors.toList());\n// adults = [\"Alice\", \"Charlie\"]\n\n// Tính tổng tuổi\nint totalAge = people.stream()\n    .mapToInt(Person::age)\n    .sum();\n// totalAge = 64"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Phương thức nào biến đổi mỗi phần tử Stream?",options:["filter()","map()","forEach()","collect()"],answer:1,explanation:"map() biến đổi 1-1: mỗi input → một output."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Phương thức nào là terminal operation?",options:["filter()","map()","sorted()","collect()"],answer:3,explanation:"collect() là terminal — kết thúc pipeline và trả về kết quả."},
          {type:"mcq",difficulty:"intermediate",badge:"Lý thuyết",question:"Method reference <code>System.out::println</code> tương đương lambda nào?",options:["s -> System.out.println(s)","() -> System.out.println()","System.out.println(s)","s -> println(s)"],answer:0,explanation:"System.out::println = s -> System.out.println(s)"},
          {type:"fill",difficulty:"basic",badge:"Điền khuyết",question:"Lọc số chẵn: <code>list.stream().filter(n -> ___ )</code>",expectedKeywords:["n%2==0","n%2==0","n%2==0)","n%2==0;","n%2==0"].map(s=>s.replace("="," == ")),explanation:"n % 2 == 0 kiểm tra số chẵn."},
          {type:"code",difficulty:"advanced",badge:"Thực hành",question:"Dùng Stream API để: lọc các chuỗi có độ dài > 3, chuyển thành in hoa, collect vào List.",template:"List<String> items = Arrays.asList(\"cat\", \"elephant\", \"dog\", \"tiger\");\n\n// Viết code Stream ở đây:\nList<String> result = items.stream()\n    ",
          checks:[
            {regex:/filter/,hint:"Cần dùng filter() để lọc"},
            {regex:/map\s*\(.+[Uu]pper|[Tt]oUpperCase/,hint:"Cần dùng map() với toUpperCase"},
            {regex:/collect\s*\(/,hint:"Cần dùng collect() ở cuối pipeline"}
          ],explanation:"items.stream().filter(s -> s.length() > 3).map(String::toUpperCase).collect(Collectors.toList())"},
          {type:"truefalse",difficulty:"intermediate",badge:"Đúng/Sai",question:"Stream có thể tái sử dụng sau khi đã thực hiện terminal operation?",answer:false,explanation:"Stream chỉ dùng một lần. Sau terminal operation, stream bị closed."},
          {type:"order",difficulty:"basic",badge:"Sắp xếp",question:"Sắp xếp thứ tự đúng của một Stream pipeline:",items:["Tạo Stream từ nguồn","Gọi intermediate operations (filter, map)","Gọi terminal operation (collect, forEach)","Nhận kết quả"],answer:[0,1,2,3],explanation:"Stream: create → intermediate → terminal → result."}
        ]
      },
      // --- Exception ---
      {
        id:"p1-exception",title:"Exception Handling",
        lesson:[
          {type:"p",text:"Exception trong Java chia làm 2 loại chính:"},
          {type:"ul",items:[
            "<b>Checked Exception</b>: phải xử lý (try-catch hoặc throws) — <code>IOException</code>, <code>SQLException</code>.",
            "<b>Unchecked Exception</b> (RuntimeException): không bắt buộc — <code>NullPointerException</code>, <code>IllegalArgumentException</code>, <code>ArrayIndexOutOfBounds</code>."
          ]},
          {type:"p",text:"Cấu trúc xử lý:"},
          {type:"code",text:"try {\n    // Code có thể ném exception\n    int result = 10 / 0; // ArithmeticException\n} catch (ArithmeticException e) {\n    System.err.println(\"Lỗi: \" + e.getMessage());\n} catch (Exception e) {\n    // Bắt các exception khác\n    e.printStackTrace();\n} finally {\n    // Luôn chạy, dù có exception hay không\n    System.out.println(\"Dọn dẹp tài nguyên...\");\n}\n\n// try-with-resources (Java 7+)\ntry (BufferedReader br = new BufferedReader(new FileReader(\"file.txt\"))) {\n    System.out.println(br.readLine());\n} // Tự động close, không cần finally"},
          {type:"p",text:"💡 <b>Best practices:</b> Không bắt <code>Exception</code> chung chung. Bắt ngoại lệ cụ thể. Dùng try-with-resources cho Closeable."}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Checked exception có bắt buộc xử lý không?",options:["Có","Không","Tuỳ trường hợp","Chỉ khi runtime"],answer:0,explanation:"Checked exception bắt buộc phải xử lý (try-catch hoặc throws)."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Từ khoá nào dùng để ném exception?",options:["throw","throws","try","catch"],answer:0,explanation:"throw ném exception. throws khai báo exception mà method có thể ném."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Exception nào xảy ra khi chia một số cho 0?",options:["IOException","NullPointerException","ArithmeticException","ClassNotFoundException"],answer:2,explanation:"ArithmeticException — lỗi toán học, ví dụ chia cho 0."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Cấu trúc tự động đóng resource từ Java 7: <code>try-___</code>",expectedKeywords:["with-resources","with-resources)","with-resources {"],explanation:"try-with-resources tự động gọi close() cho các resource implements AutoCloseable."},
          {type:"truefalse",difficulty:"basic",badge:"Đúng/Sai",question:"Finally block luôn chạy, kể cả khi có return trong try?",answer:true,explanation:"finally luôn chạy trước khi method trả về, trừ khi JVM bị crash."},
          {type:"code",difficulty:"advanced",badge:"Thực hành",question:"Viết method divide an toàn: nhận 2 số, trả về kết quả, xử lý ArithmeticException.",template:"public static int safeDivide(int a, int b) {\n    // Code của bạn\n}",
          checks:[
            {regex:/try\s*\{/,hint:"Cần khối try"},
            {regex:/catch\s*\(/,hint:"Cần catch exception"},
            {regex:/ArithmeticException|Exception/,hint:"Bắt ArithmeticException"}
          ],explanation:"Dùng try-catch để bắt ArithmeticException khi chia cho 0."}
        ]
      },
      // --- Maven & Git ---
      {
        id:"p1-maven",title:"Maven & Git",
        lesson:[
          {type:"p",text:"<b>Maven</b> — công cụ build & quản lý dependency phổ biến nhất cho Java."},
          {type:"ul",items:[
            "<code>pom.xml</code>: Project Object Model — khai báo dependencies, plugins, profiles.",
            "<b>Lifecycle</b>: <code>validate</code> → <code>compile</code> → <code>test</code> → <code>package</code> → <code>verify</code> → <code>install</code> → <code>deploy</code>.",
            "<b>Spring Boot starters</b>: <code>spring-boot-starter-web</code>, <code>spring-boot-starter-data-jpa</code>, <code>spring-boot-starter-security</code>."
          ]},
          {type:"p",text:"<b>Git</b> — quản lý phiên bản phân tán."},
          {type:"ul",items:[
            "Cơ bản: <code>init</code>, <code>clone</code>, <code>add</code>, <code>commit</code>, <code>push</code>, <code>pull</code>.",
            "Branch: <code>branch</code>, <code>checkout -b</code>, <code>merge</code>, <code>rebase</code>.",
            "Git flow: main → develop → feature branches → pull request → merge."
          ]},
          {type:"code",text:"<!-- pom.xml ví dụ -->\n<project>\n    <groupId>com.example</groupId>\n    <artifactId>my-app</artifactId>\n    <version>1.0.0</version>\n    \n    <parent>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-parent</artifactId>\n        <version>3.2.0</version>\n    </parent>\n    \n    <dependencies>\n        <dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-web</artifactId>\n        </dependency>\n    </dependencies>\n</project>"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"File cấu hình Maven có tên là gì?",options:["build.gradle","pom.xml","application.properties","settings.xml"],answer:1,explanation:"pom.xml — Project Object Model."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Lệnh Maven nào chạy test?",options:["mvn compile","mvn package","mvn test","mvn clean"],answer:2,explanation:"mvn test chạy các unit test trong dự án."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Lệnh Git nào tạo branch mới?",options:["git branch","git checkout -b","git switch","Cả A và B"],answer:3,explanation:"git branch tạo branch, git checkout -b tạo + chuyển sang branch mới."},
          {type:"mcq",difficulty:"intermediate",badge:"Lý thuyết",question:"Spring Boot version mới nhất (2024) là dòng nào?",options:["2.x","3.x","1.x","4.x"],answer:1,explanation:"Spring Boot 3.x (Java 17+) là dòng mới nhất, yêu cầu Java 17 trở lên."},
          {type:"fill",difficulty:"basic",badge:"Điền khuyết",question:"Thẻ Maven định nghĩa project identifier: <code>&lt;___&gt;com.example&lt;/___&gt;</code>",expectedKeywords:["groupId"],explanation:"groupId xác định tổ chức/domain của dự án."},
          {type:"truefalse",difficulty:"intermediate",badge:"Đúng/Sai",question:"Git merge và git rebase đều dùng để kết hợp code từ branch khác?",answer:true,explanation:"Cả hai đều kết hợp code, nhưng merge giữ lịch sử, rebase làm sạch lịch sử."}
        ]
      },
      // --- Generics & Optional ---
      {
        id:"p1-generics",title:"Generics & Optional",
        lesson:[
          {type:"p",text:"<b>Generics</b> — lập trình tổng quát, an toàn kiểu dữ liệu (type-safe)."},
          {type:"code",text:"// Generic class\npublic class Box<T> {\n    private T value;\n    public void set(T value) { this.value = value; }\n    public T get() { return value; }\n}\n\nBox<String> stringBox = new Box<>();\nstringBox.set(\"Hello\");\n\n// Generic method\npublic static <T> T getFirst(List<T> list) {\n    return list.get(0);\n}\n\n// Wildcard\npublic void printList(List<? extends Number> list) {\n    list.forEach(System.out::println);\n}"},
          {type:"p",text:"<b>Optional</b> (Java 8+) — container có thể rỗng, tránh NullPointerException."},
          {type:"code",text:"public Optional<User> findById(Long id) {\n    // ...\n    return Optional.ofNullable(user);\n}\n\n// Sử dụng\nUser user = findById(1L)\n    .orElseThrow(() -> new NotFoundException(\"User not found\"));\n\nfindByName(\"Alice\")\n    .map(User::getEmail)\n    .ifPresentOrElse(\n        email -> System.out.println(\"Email: \" + email),\n        () -> System.out.println(\"Not found\")\n    );"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Ký hiệu nào dùng trong Generics để đại diện kiểu không xác định?",options:["?","T","E","Tất cả đều đúng"],answer:3,explanation:"? (wildcard), T (Type), E (Element) đều dùng trong generics."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Method nào của Optional trả về giá trị hoặc ném exception?",options:["orElse()","orElseGet()","orElseThrow()","get()"],answer:2,explanation:"orElseThrow() trả về giá trị hoặc ném NoSuchElementException."},
          {type:"fill",difficulty:"basic",badge:"Điền khuyết",question:"Optional.empty() tạo Optional ___ (rỗng/không rỗng)",expectedKeywords:["rỗng","empty","trống"],explanation:"Optional.empty() tạo Optional rỗng, không chứa giá trị."},
          {type:"truefalse",difficulty:"basic",badge:"Đúng/Sai",question:"Generic type parameter có thể là kiểu nguyên thuỷ (int, double)?",answer:false,explanation:"Generic chỉ hoạt động với reference types. Dùng Integer, Double thay thế."}
        ]
      },
      // --- Constructor Deep Dive ---
      {
        id:"p1-constructor",title:"Constructor Chuyên sâu",
        sources:[
          {name:"Oracle — Providing Constructors",url:"https://docs.oracle.com/javase/tutorial/java/javaOO/constructors.html"},
          {name:"Baeldung — Java Constructors",url:"https://www.baeldung.com/java-constructors"},
          {name:"GeeksForGeeks — Constructors in Java",url:"https://www.geeksforgeeks.org/constructors-in-java/"}
        ],
        lesson:[
          {type:"p",text:"<b>Constructor</b> là phương thức đặc biệt khởi tạo object — cùng tên với class, không có return type."},
          {type:"p",text:"<b>Các loại Constructor:</b>"},
          {type:"ul",items:[
            "<b>Default Constructor</b>: Java tự tạo nếu không khai báo constructor nào. Không tham số, không làm gì.",
            "<b>Parameterized Constructor</b>: có tham số, dùng để khởi tạo object với dữ liệu cụ thể.",
            "<b>Copy Constructor</b>: nhận object cùng loại, copy dữ liệu — Java không có sẵn, tự implement.",
            "<b>Private Constructor</b>: ngăn không cho tạo object từ bên ngoài — dùng trong Singleton, Utility class.",
            "<b>Constructor Chaining với <code>this()</code></b>: constructor gọi constructor khác trong cùng class."
          ]},
          {type:"code",text:"// Các loại Constructor\npublic class Student {\n    private String name;\n    private int age;\n    private String email;\n    \n    // 1. Default constructor (nếu không có constructor nào, Java tự tạo)\n    public Student() {}\n    \n    // 2. Parameterized constructor\n    public Student(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n    \n    // 3. Constructor chaining với this()\n    public Student(String name, int age, String email) {\n        this(name, age);  // Gọi constructor 2 tham số ở trên\n        this.email = email;\n    }\n    \n    // 4. Copy constructor\n    public Student(Student other) {\n        this(other.name, other.age, other.email);\n    }\n    \n    // 5. Private constructor — Singleton pattern\n    private Student() {}\n    \n    private static final Student INSTANCE = new Student();\n    public static Student getInstance() { return INSTANCE; }\n}"},
          {type:"p",text:"<b>Lưu ý quan trọng:</b>"},
          {type:"ul",items:[
            "Nếu class có <b>field final</b>, bắt buộc phải khởi tạo trong constructor.",
            "Constructor không kế thừa — class con phải gọi <code>super()</code>.",
            "Nếu class cha không có default constructor, class con bắt buộc gọi <code>super(params)</code>.",
            "Constructor có thể ném exception (checked/unchecked).",
            "Interface không có constructor.",
            "Abstract class có constructor — chạy khi subclass được khởi tạo."
          ]},
          {type:"code",text:"// Constructor với super() và final field\npublic abstract class Animal {\n    protected final String species;  // final field\n    \n    public Animal(String species) {\n        this.species = species;\n    }\n}\n\npublic class Dog extends Animal {\n    private final String name;\n    \n    public Dog(String name) {\n        super(\"Canine\");  // Bắt buộc gọi super\n        this.name = name;\n    }\n}"}
        ],
        exercises:[
          // CƠ BẢN
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Constructor có return type không?",options:["Có — void","Có — kiểu của class","Không — constructor không có return type","Có — int"],answer:2,explanation:"Constructor không có return type — không void, không kiểu gì cả."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Khi nào Java tạo default constructor?",options:["Luôn luôn","Chỉ khi class không có constructor nào","Khi class có ít nhất 1 field","Khi class không phải là abstract"],answer:1,explanation:"Java chỉ tạo default constructor nếu class không khai báo constructor nào."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Private constructor dùng trong pattern nào?",options:["Factory","Builder","Singleton","Prototype"],answer:2,explanation:"Private constructor + static method getInstance() = Singleton pattern."},
          // TRUNG CẤP
          {type:"mcq",difficulty:"intermediate",badge:"Phỏng vấn",question:"Class con bắt buộc gọi super() khi nào?",options:["Luôn luôn","Khi class cha không có default constructor","Khi class cha có default constructor","Không bao giờ"],answer:1,explanation:"Nếu class cha chỉ có parameterized constructor (không có default), class con bắt buộc gọi super(params)."},
          {type:"mcq",difficulty:"intermediate",badge:"Phỏng vấn",question:"Constructor chaining dùng từ khoá nào?",options:["super()","this()","super.this()","self()"],answer:1,explanation:"this() gọi constructor khác trong cùng class. super() gọi constructor class cha."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Từ khoá gọi constructor class cha: <code>___()</code>",expectedKeywords:["super","super()"],explanation:"super() — gọi constructor của class cha."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"interface ___ có constructor? (có/không)",expectedKeywords:["không","không ","Không"],explanation:"Interface không có constructor vì không thể tạo instance."},
          {type:"truefalse",difficulty:"intermediate",badge:"Đúng/Sai",question:"Constructor có thể có access modifier private?",answer:true,explanation:"Đúng. Private constructor ngăn tạo instance từ bên ngoài class."},
          {type:"truefalse",difficulty:"intermediate",badge:"Đúng/Sai",question:"Constructor của class cha được kế thừa bởi class con?",answer:false,explanation:"Constructor không kế thừa. Class con dùng super() để gọi constructor class cha."},
          // VẬN DỤNG CAO
          {type:"code",difficulty:"advanced",badge:"Thực hành",question:"Viết class Person với constructor chaining: default → (name) → (name, age)",template:"public class Person {\n    private String name;\n    private int age;\n    \n    // Default constructor\n    \n    // Constructor 1 tham số: name\n    \n    // Constructor 2 tham số: name, age\n}",
          checks:[
            {regex:/public\s+Person\s*\(\s*\)/,hint:"Cần default constructor"},
            {regex:/public\s+Person\s*\(\s*String\s+\w+\s*\)/,hint:"Cần constructor với 1 tham số String"},
            {regex:/this\s*\(/,hint:"Dùng this() để gọi constructor khác"},
            {regex:/this\.\w+\s*=/,hint:"Gán giá trị cho field"}
          ],explanation:"Person() → this(\"\") → Person(name) → this(name, 0) → Person(name, age)."},
          {type:"order",difficulty:"advanced",badge:"Sắp xếp",question:"Sắp xếp thứ tự khởi tạo object:",items:["Static block chạy","Constructor class cha chạy","Constructor class con chạy","Instance initializer block chạy (nếu có)"],answer:[0,1,3,2],explanation:"Static block → super() constructor → instance init → constructor body."},
          {type:"truefalse",difficulty:"advanced",badge:"Vận dụng cao",question:"Nếu class cha không có default constructor và class con không gọi super(), kết quả là compile error?",answer:true,explanation:"Đúng. Compile error vì class con bắt buộc phải gọi constructor class cha (trực tiếp hoặc gián tiếp)."}  // ADVANCED: edge case
        ]
      },
      // --- Collections Comparison ---
      {
        id:"p1-collections-compare",title:"Collections So sánh Chuyên sâu",
        sources:[
          {name:"Baeldung — Java Collection Frameworks",url:"https://www.baeldung.com/java-collections"},
          {name:"Oracle — Collections Trail",url:"https://docs.oracle.com/javase/tutorial/collections/"},
          {name:"GeeksForGeeks — ArrayList vs LinkedList",url:"https://www.geeksforgeeks.org/arraylist-vs-linkedlist-java/"},
          {name:"Baeldung — HashMap vs TreeMap vs LinkedHashMap",url:"https://www.baeldung.com/java-hashmap-vs-treemap"},
          {name:"Baeldung — Comparable vs Comparator",url:"https://www.baeldung.com/java-comparator-comparable"}
        ],
        lesson:[
          {type:"p",text:"<b>So sánh chi tiết các Collection thường gặp trong phỏng vấn:</b>"},
          {type:"p",text:"<b>1. ArrayList vs LinkedList</b>"},
          {type:"ul",items:[
            "<b>ArrayList</b>: mảng động — get O(1), add O(1)*, add giữa O(n), remove O(n). Dùng khi: truy cập ngẫu nhiên nhiều, ít thêm/xoá giữa.",
            "<b>LinkedList</b>: doubly-linked list — get O(n), add O(1), remove O(1). Dùng khi: thêm/xoá đầu/cuối nhiều, implement Queue/Deque.",
            "ArrayList tốn ít bộ nhớ hơn LinkedList (mỗi node LinkedList lưu thêm 2 pointer)."
          ]},
          {type:"p",text:"<b>2. ArrayList vs HashSet</b>"},
          {type:"ul",items:[
            "<b>ArrayList</b>: có thứ tự, cho phép trùng, get O(1) theo index, contains O(n).",
            "<b>HashSet</b>: không thứ tự, không trùng, contains O(1) (nhờ hashCode), không có get(index).",
            "HashSet yêu cầu <code>hashCode()</code> và <code>equals()</code> được implement đúng."
          ]},
          {type:"p",text:"<b>3. HashMap vs TreeMap vs LinkedHashMap</b>"},
          {type:"ul",items:[
            "<b>HashMap</b>: O(1) cho get/put, không đảm bảo thứ tự, cho phép 1 null key.",
            "<b>TreeMap</b>: O(log n), có thứ tự theo key (Red-Black Tree), không null key.",
            "<b>LinkedHashMap</b>: O(1), giữ thứ tự chèn (hoặc truy cập), dùng cho LRU cache."
          ]},
          {type:"p",text:"<b>4. Comparable vs Comparator</b>"},
          {type:"ul",items:[
            "<b>Comparable</b>: <code>compareTo(T o)</code> — định nghĩa thứ tự tự nhiên. Một class chỉ có 1 Comparable.",
            "<b>Comparator</b>: <code>compare(T o1, T o2)</code> — định nghĩa thứ tự tuỳ chỉnh. Có thể có nhiều Comparator.",
            "Dùng <code>Collections.sort(list)</code> cho Comparable, <code>Collections.sort(list, comparator)</code> cho Comparator."
          ]},
          {type:"p",text:"<b>5. Fail-Fast vs Fail-Safe Iterator</b>"},
          {type:"ul",items:[
            "<b>Fail-Fast</b>: ném ConcurrentModificationException nếu collection bị sửa trong khi duyệt (ArrayList, HashMap).",
            "<b>Fail-Safe</b>: duyệt trên bản sao, không ném exception (ConcurrentHashMap, CopyOnWriteArrayList)."
          ]},
          {type:"code",text:"// Comparable vs Comparator\npublic class Student implements Comparable<Student> {\n    private String name;\n    private int score;\n    \n    @Override\n    public int compareTo(Student other) {\n        return Integer.compare(this.score, other.score);\n    }\n}\n\n// Comparator — sắp xếp theo tên\nComparator<Student> byName = (s1, s2) -> s1.getName().compareTo(s2.getName());\n\n// Sử dụng\nList<Student> list = new ArrayList<>();\nCollections.sort(list);          // dùng Comparable (theo score)\nCollections.sort(list, byName);  // dùng Comparator (theo name)\nlist.sort(Comparator.comparing(Student::getName).reversed());"},
          {type:"code",text:"// So sánh hiệu năng — ví dụ\nList<Integer> arrayList = new ArrayList<>();\nList<Integer> linkedList = new LinkedList<>();\n\n// Thêm 100,000 phần tử\nlong start = System.nanoTime();\nfor (int i = 0; i < 100000; i++) arrayList.add(i);\nlong t1 = System.nanoTime() - start;\n\nstart = System.nanoTime();\nfor (int i = 0; i < 100000; i++) linkedList.add(i);\nlong t2 = System.nanoTime() - start;\n// ArrayList thêm cuối: O(1) — nhanh hơn LinkedList (phải tạo node mới mỗi lần)\n\n// Thêm vào đầu\nstart = System.nanoTime();\narrayList.add(0, -1);  // O(n) — dịch toàn bộ phần tử\nt1 = System.nanoTime() - start;\n\nstart = System.nanoTime();\nlinkedList.add(0, -1); // O(1) — chỉ thay đổi pointer\nt2 = System.nanoTime() - start;\n// LinkedList thêm đầu: O(1) — nhanh hơn nhiều"}
        ],
        exercises:[
          // CƠ BẢN
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"ArrayList vs LinkedList — cái nào get(index) nhanh hơn?",options:["ArrayList O(1)","LinkedList O(1)","Bằng nhau","Tuỳ kích thước"],answer:0,explanation:"ArrayList: mảng → get(index) = O(1). LinkedList: phải duyệt từ đầu → O(n)."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"HashSet dùng cơ chế gì để kiểm tra phần tử đã tồn tại?",options:["equals()","hashCode()","hashCode() + equals()","compareTo()"],answer:2,explanation:"HashSet dùng hashCode() để tìm bucket, equals() để so sánh chính xác."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"HashMap cho phép bao nhiêu null key?",options:["0","1","Nhiều","Tuỳ dung lượng"],answer:1,explanation:"HashMap chỉ cho phép 1 null key (vì key là duy nhất)."},
          // TRUNG CẤP
          {type:"mcq",difficulty:"intermediate",badge:"Phỏng vấn",question:"ConcurrentModificationException xảy ra khi nào?",options:["Khi hết bộ nhớ","Khi sửa collection trong khi duyệt (fail-fast)","Khi get phần tử không tồn tại","Khi add null vào HashSet"],answer:1,explanation:"Fail-fast iterator ném ConcurrentModificationException khi collection bị thay đổi trong lúc duyệt."},
          {type:"mcq",difficulty:"intermediate",badge:"Phỏng vấn",question:"TreeMap sắp xếp key theo thứ tự nào?",options:["Thứ tự chèn","Tự nhiên của key (Comparable)","Ngẫu nhiên","Thứ tự truy cập"],answer:1,explanation:"TreeMap dùng Red-Black Tree, sắp xếp theo Comparable (hoặc Comparator) của key."},
          {type:"mcq",difficulty:"intermediate",badge:"Phỏng vấn",question:"LinkedHashMap dùng cho use case nào?",options:["LRU Cache","Sorting","Full-text search","Thread-safe map"],answer:0,explanation:"LinkedHashMap giữ thứ tự truy cập (accessOrder=true) — dùng cho LRU Cache."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Interface định nghĩa thứ tự tự nhiên: <code>___&lt;T&gt;</code>",expectedKeywords:["Comparable","Comparable<T>"],explanation:"Comparable<T> — compareTo(T o) định nghĩa thứ tự tự nhiên."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Sắp xếp list bằng lambda: <code>list.sort(Comparator.comparing(Student::___))</code>",expectedKeywords:["getName","getName()","getName).reversed"],explanation:"Comparator.comparing(Student::getName) — method reference tạo Comparator."},
          {type:"truefalse",difficulty:"intermediate",badge:"Phỏng vấn",question:"LinkedList implements cả List và Deque?",answer:true,explanation:"LinkedList implements List, Deque, Queue — có thể dùng làm Stack, Queue, hoặc List."},
          {type:"truefalse",difficulty:"intermediate",badge:"Phỏng vấn",question:"HashSet cho phép phần tử trùng lặp?",answer:false,explanation:"HashSet không cho phép trùng. add() trả về false nếu phần tử đã tồn tại."},
          // VẬN DỤNG CAO
          {type:"code",difficulty:"advanced",badge:"Thực hành",question:"Viết code so sánh Student theo tên (Comparator), nếu tên trùng thì theo điểm giảm dần",template:"List<Student> students = Arrays.asList(\n    new Student(\"Alice\", 85),\n    new Student(\"Bob\", 90),\n    new Student(\"Alice\", 95)\n);\n// Viết Comparator: theo tên ASC, nếu trùng tên thì theo điểm DESC\nstudents.sort(",
          checks:[
            {regex:/Comparator/,hint:"Dùng Comparator"},
            {regex:/comparing/,hint:"Dùng Comparator.comparing()"},
            {regex:/thenComparing/,hint:"Cần thenComparing cho sort thứ 2"},
            {regex:/reversed/,hint:"Cần reversed() cho điểm giảm dần"}
          ],explanation:"Comparator.comparing(Student::getName).thenComparing(Comparator.comparing(Student::getScore).reversed())"},
          {type:"mcq",difficulty:"advanced",badge:"Vận dụng cao",question:"Khi nào dùng CopyOnWriteArrayList thay vì ArrayList?",options:["Khi cần thread-safe iteration","Khi cần hiệu năng ghi cao","Khi cần sort nhanh","Khi cần lưu nhiều dữ liệu"],answer:0,explanation:"CopyOnWriteArrayList: thread-safe, tạo bản sao khi write → phù hợp read-nhiều hơn write."}
        ]
      },
      // --- Multithreading & Deadlock ---
      {
        id:"p1-thread",title:"Đa luồng & Deadlock",
        sources:[
          {name:"Oracle — Concurrency",url:"https://docs.oracle.com/javase/tutorial/essential/concurrency/"},
          {name:"Baeldung — Java Concurrency",url:"https://www.baeldung.com/java-concurrency"},
          {name:"Baeldung — Deadlock in Java",url:"https://www.baeldung.com/java-deadlock-livelock"},
          {name:"GeeksForGeeks — Multithreading in Java",url:"https://www.geeksforgeeks.org/multithreading-in-java/"},
          {name:"Baeldung — ExecutorService",url:"https://www.baeldung.com/java-executor-service-tutorial"}
        ],
        lesson:[
          {type:"p",text:"<b>Multithreading</b> — chạy nhiều luồng song song trong cùng một tiến trình."},
          {type:"p",text:"<b>Cách tạo Thread trong Java:</b>"},
          {type:"ul",items:[
            "1. extends <code>Thread</code> — override <code>run()</code>.",
            "2. implements <code>Runnable</code> — truyền vào Thread.",
            "3. implements <code>Callable&lt;V&gt;</code> — trả về kết quả, dùng với <code>FutureTask</code>.",
            "4. <code>ExecutorService</code> — quản lý thread pool chuyên nghiệp."
          ]},
          {type:"p",text:"<b>Thread Lifecycle:</b> NEW → RUNNABLE → RUNNING → BLOCKED/WAITING → TERMINATED."},
          {type:"code",text:"// Các cách tạo Thread\n// Cách 1: extends Thread\nclass MyThread extends Thread {\n    @Override\n    public void run() {\n        System.out.println(\"Thread: \" + getName());\n    }\n}\nnew MyThread().start();\n\n// Cách 2: implements Runnable\nThread t = new Thread(() -> System.out.println(\"Runnable running\"));\nt.start();\n\n// Cách 3: ExecutorService (khuyên dùng)\nExecutorService executor = Executors.newFixedThreadPool(4);\nexecutor.submit(() -> System.out.println(\"Task executed\"));\nexecutor.shutdown();\n\n// Cách 4: CompletableFuture (Java 8+)\nCompletableFuture.supplyAsync(() -> fetchData())\n    .thenApply(data -> process(data))\n    .thenAccept(result -> System.out.println(result));"},
          {type:"p",text:"<b>Deadlock</b> — 4 điều kiện (Coffman conditions):"},
          {type:"ul",items:[
            "1. <b>Mutual Exclusion</b>: tài nguyên chỉ một thread dùng tại một thời điểm.",
            "2. <b>Hold and Wait</b>: thread giữ tài nguyên này trong khi chờ tài nguyên khác.",
            "3. <b>No Preemption</b>: không thể thu hồi tài nguyên từ thread đang giữ.",
            "4. <b>Circular Wait</b>: vòng tròn chờ đợi: T1 chờ T2, T2 chờ T3, ..., Tn chờ T1."
          ]},
          {type:"p",text:"<b>Cách phòng tránh Deadlock:</b>"},
          {type:"ul",items:[
            "Tránh Hold and Wait: yêu cầu tất cả tài nguyên cùng lúc.",
            "Lock ordering: luôn lock theo cùng một thứ tự.",
            "Dùng <code>tryLock()</code> với timeout (ReentrantLock).",
            "Dùng cấu trúc dữ liệu thread-safe (ConcurrentHashMap, BlockingQueue)."
          ]},
          {type:"code",text:"// Ví dụ Deadlock\npublic class DeadlockExample {\n    private static final Object lockA = new Object();\n    private static final Object lockB = new Object();\n    \n    public static void main(String[] args) {\n        Thread t1 = new Thread(() -> {\n            synchronized (lockA) {\n                sleep(100);\n                synchronized (lockB) {  // Chờ t2 release lockB\n                    System.out.println(\"T1: done\");\n                }\n            }\n        });\n        \n        Thread t2 = new Thread(() -> {\n            synchronized (lockB) {\n                sleep(100);\n                synchronized (lockA) {  // Chờ t1 release lockA\n                    System.out.println(\"T2: done\");\n                }\n            }\n        });\n        // → Cả 2 thread stuck vì: T1 giữ lockA chờ lockB, T2 giữ lockB chờ lockA\n    }\n}\n\n// Fix: Lock ordering — luôn lock A trước B\npublic void safeMethod() {\n    synchronized (lockA) {\n        synchronized (lockB) {\n            // Cả 2 thread lock theo thứ tự giống nhau → không deadlock\n        }\n    }\n}"},
          {type:"p",text:"<b>synchronized, volatile, AtomicInteger:</b>"},
          {type:"ul",items:[
            "<code>synchronized</code>: lock monitor của object — đảm bảo mutual exclusion.",
            "<code>volatile</code>: đảm bảo visibility — thread đọc luôn thấy giá trị mới nhất.",
            "<code>AtomicInteger</code>: thread-safe increment/decrement không cần synchronized.",
            "<code>ReentrantLock</code>: linh hoạt hơn synchronized — tryLock, lockInterruptibly."
          ]}
        ],
        exercises:[
          // CƠ BẢN
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"4 điều kiện gây ra Deadlock gọi là gì?",options:["Coffman conditions","Deadlock quartet","Thread conditions","Lock conditions"],answer:0,explanation:"Coffman conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Cách tạo Thread nào được khuyên dùng nhất?",options:["extends Thread","implements Runnable","ExecutorService","new Thread(override run())"],answer:2,explanation:"ExecutorService quản lý thread pool, tái sử dụng thread, kiểm soát tài nguyên tốt."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Callable khác Runnable ở điểm nào?",options:["Callable chạy nhanh hơn","Callable trả về kết quả, có thể ném exception","Callable không cần Thread","Callable dùng cho thread an toàn"],answer:1,explanation:"Callable<V> trả về kiểu V và có thể throws Exception. Runnable không trả về gì."},
          // TRUNG CẤP
          {type:"mcq",difficulty:"intermediate",badge:"Phỏng vấn",question:"Từ khoá nào đảm bảo visibility — thread đọc được giá trị mới nhất?",options:["synchronized","volatile","static","final"],answer:1,explanation:"volatile — đảm bảo mọi thread đọc giá trị từ main memory, không từ cache local."},
          {type:"mcq",difficulty:"intermediate",badge:"Phỏng vấn",question:"Cách đơn giản nhất để tránh deadlock?",options:["Dùng nhiều thread hơn","Lock ordering — luôn lock theo thứ tự cố định","Tăng heap size","Dùng synchronized thay vì Lock"],answer:1,explanation:"Lock ordering: mọi thread lock các tài nguyên theo cùng một thứ tự → không có circular wait."},
          {type:"mcq",difficulty:"intermediate",badge:"Phỏng vấn",question:"Phương thức của ExecutorService để gửi task và nhận kết quả?",options:["execute()","submit()","run()","start()"],answer:1,explanation:"submit(Callable) trả về Future<T>. execute(Runnable) không trả về."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Lớp atomic cho Integer: <code>___Integer</code>",expectedKeywords:["Atomic","Atomic\n"],explanation:"AtomicInteger — incrementAndGet(), decrementAndGet(), compareAndSet() — thread-safe không cần lock."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Phương thức ReentrantLock thử lock với timeout: <code>tryLock(long ___, TimeUnit.SECONDS)</code>",expectedKeywords:["timeout","timeout\n","timeout,"],explanation:"tryLock(1, TimeUnit.SECONDS) — thử lock trong 1 giây, tránh deadlock."},
          {type:"truefalse",difficulty:"intermediate",badge:"Phỏng vấn",question:"synchronized đảm bảo cả mutual exclusion và visibility?",answer:true,explanation:"synchronized vừa loại trừ (mutual exclusion) vừa đồng bộ bộ nhớ (visibility)."},
          {type:"truefalse",difficulty:"intermediate",badge:"Phỏng vấn",question:"Thread.sleep() trong khối synchronized có giải phóng lock?",answer:false,explanation:"sleep() không giải phóng lock — thread vẫn giữ lock khi ngủ. wait() mới giải phóng lock."},
          // VẬN DỤNG CAO
          {type:"code",difficulty:"advanced",badge:"Thực hành",question:"Viết chương trình: 2 thread cùng tăng một biến count lên 1000 mỗi thread (dùng AtomicInteger)",template:"public class CounterExample {\n    private static ___ count = new ___(0);\n    \n    public static void main(String[] args) throws InterruptedException {\n        \n    }\n}",
          checks:[
            {regex:/AtomicInteger/,hint:"Dùng AtomicInteger cho thread-safe increment"},
            {regex:/ExecutorService|newFixedThreadPool/,hint:"Dùng ExecutorService hoặc tạo Thread"},
            {regex:/incrementAndGet/,hint:"Dùng incrementAndGet() để tăng"},
            {regex:/awaitTermination|join/,hint:"Chờ thread kết thúc trước khi in kết quả"}
          ],explanation:"AtomicInteger count = new AtomicInteger(0); executor.submit(() -> { for (...) count.incrementAndGet(); }); executor.shutdown(); executor.awaitTermination(...);"},
          {type:"order",difficulty:"advanced",badge:"Sắp xếp",question:"Sắp xếp vòng đời Thread:",items:["NEW","RUNNABLE","RUNNING","BLOCKED/WAITING","TERMINATED"],answer:[0,1,2,3,4],explanation:"NEW → start() → RUNNABLE → scheduler chọn → RUNNING → wait/block → BLOCKED → resume → RUNNING → done → TERMINATED."}
        ]
      }
    ]
  },

  // ============================================================
  // PHASE 2: SPRING BOOT CORE
  // ============================================================
  {
    id:"phase-2",title:"Spring Boot Core",icon:"🚀",
    desc:"IoC/DI, REST API, Configuration, Bean Scopes, Logging",
    topics:[
      // --- IoC & DI ---
      {
        id:"p2-ioc",title:"IoC & Dependency Injection",
        lesson:[
          {type:"p",text:"<b>IoC (Inversion of Control)</b>: Spring container quản lý vòng đời bean, tự động inject dependency."},
          {type:"p",text:"<b>DI (Dependency Injection)</b> — 3 cách:"},
          {type:"ul",items:[
            "<b>Constructor Injection</b> (👍 khuyên dùng): final field, immutable, dễ test.",
            "<b>Setter Injection</b>: dùng cho optional dependencies.",
            "<b>Field Injection</b> (@Autowired trên field): không khuyến khích, khó test."
          ]},
          {type:"p",text:"<b>Stereotype annotations</b>:"},
          {type:"ul",items:[
            "<code>@Component</code> — generic bean.",
            "<code>@Service</code> — business logic layer.",
            "<code>@Repository</code> — data access layer (Spring tự thêm exception translation).",
            "<code>@Controller</code> / <code>@RestController</code> — web layer."
          ]},
          {type:"code",text:"@Service\npublic class UserService {\n    private final UserRepository userRepo;\n    private final EmailService emailService;\n    \n    // Constructor Injection — không cần @Autowired (từ Spring 4.3+)\n    public UserService(UserRepository userRepo, EmailService emailService) {\n        this.userRepo = userRepo;\n        this.emailService = emailService;\n    }\n    \n    public User register(RegisterRequest req) {\n        User user = new User(req.name(), req.email());\n        user = userRepo.save(user);\n        emailService.sendWelcome(user.getEmail());\n        return user;\n    }\n}"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Annotation nào đánh dấu class là Spring bean tầng service?",options:["@Component","@Service","@Repository","@Bean"],answer:1,explanation:"@Service chuyên cho tầng business logic."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Kiểu DI nào được khuyên dùng nhất?",options:["Field Injection","Setter Injection","Constructor Injection","Method Injection"],answer:2,explanation:"Constructor Injection: immutable, dễ test, rõ dependencies."},
          {type:"mcq",difficulty:"intermediate",badge:"Lý thuyết",question:"Từ Spring 4.3, constructor có 1 tham số có cần @Autowired không?",options:["Có","Không","Tuỳ cấu hình","Chỉ khi có @Qualifier"],answer:1,explanation:"Spring 4.3+ tự động inject nếu class chỉ có một constructor."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Annotation đánh dấu phương thức tạo bean trong @Configuration class: <code>@___</code>",expectedKeywords:["Bean","Bean\n","Bean {"],explanation:"@Bean khai báo một bean do method trả về."},
          {type:"truefalse",difficulty:"basic",badge:"Đúng/Sai",question:"@Repository có thêm chức năng chuyển đổi exception thành DataAccessException?",answer:true,explanation:"Đúng! @Repository thêm persistence exception translation."},
          {type:"code",difficulty:"advanced",badge:"Thực hành",question:"Viết một @Service inject 2 dependencies qua constructor.",template:"// Khai báo service với constructor injection\n// Giả sử có UserRepository và NotificationService\n\n@Service\n",
          checks:[
            {regex:/@Service/,hint:"Cần @Service annotation"},
            {regex:/private\s+final/,hint:"Dùng private final cho dependencies"},
            {regex:/public\s+\w+Service\s*\(/,hint:"Cần constructor với tham số"}
          ],explanation:"@Service + constructor với các dependency làm tham số."}
        ]
      },
      // --- REST API ---
      {
        id:"p2-rest",title:"REST API với Spring Boot",
        lesson:[
          {type:"p",text:"<b>REST (Representational State Transfer)</b> — chuẩn kiến trúc API web."},
          {type:"p",text:"HTTP Methods + Response Status:"},
          {type:"ul",items:[
            "<b>GET</b> — 200 OK: lấy dữ liệu.",
            "<b>POST</b> — 201 Created: tạo mới.",
            "<b>PUT</b> — 200 OK: cập nhật toàn bộ.",
            "<b>PATCH</b> — 200 OK: cập nhật một phần.",
            "<b>DELETE</b> — 204 No Content: xoá."
          ]},
          {type:"p",text:"Annotations quan trọng:"},
          {type:"ul",items:[
            "<code>@RestController</code> = @Controller + @ResponseBody (trả JSON tự động).",
            "<code>@RequestMapping(\"/api/v1/users\")</code> — base URL mapping.",
            "<code>@GetMapping</code>, <code>@PostMapping</code>, <code>@PutMapping</code>, <code>@DeleteMapping</code>.",
            "<code>@PathVariable</code> — lấy từ path: <code>/users/{id}</code>",
            "<code>@RequestParam</code> — lấy query param: <code>?page=0&size=10</code>",
            "<code>@RequestBody</code> — lấy JSON từ body.",
            "<code>@ResponseStatus</code> — tuỳ chỉnh HTTP status."
          ]},
          {type:"code",text:"@RestController\n@RequestMapping(\"/api/v1/users\")\npublic class UserController {\n    private final UserService userService;\n    \n    public UserController(UserService userService) {\n        this.userService = userService;\n    }\n    \n    @GetMapping\n    public ResponseEntity<List<UserResponse>> getAll(\n            @RequestParam(defaultValue = \"0\") int page) {\n        return ResponseEntity.ok(userService.findAll(page));\n    }\n    \n    @GetMapping(\"/{id}\")\n    public ResponseEntity<UserResponse> getById(@PathVariable Long id) {\n        return ResponseEntity.ok(userService.findById(id));\n    }\n    \n    @PostMapping\n    @ResponseStatus(HttpStatus.CREATED)\n    public UserResponse create(@Valid @RequestBody CreateUserRequest req) {\n        return userService.create(req);\n    }\n}"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Annotation tổng hợp @Controller + @ResponseBody?",options:["@RestController","@ResponseBody","@Controller","@Service"],answer:0,explanation:"@RestController kết hợp cả hai, mọi method trả về JSON."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"HTTP status 201 dùng cho hành động nào?",options:["GET","POST","DELETE","PUT"],answer:1,explanation:"201 Created — tạo mới thành công (POST)."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Lấy query param với annotation nào?",options:["@PathVariable","@RequestParam","@RequestBody","@RequestHeader"],answer:1,explanation:"@RequestParam lấy tham số từ query string: ?key=value"},
          {type:"fill",difficulty:"basic",badge:"Điền khuyết",question:"Annotation lấy id từ URL: <code>/api/users/{id}</code> → <code>@___ Long id</code>",expectedKeywords:["PathVariable","PathVariable(\"id\")","PathVariable(\"id\")"],explanation:"@PathVariable lấy giá trị từ đường dẫn URL."},
          {type:"truefalse",difficulty:"basic",badge:"Đúng/Sai",question:"PUT và PATCH đều dùng để cập nhật, nhưng PUT thay thế toàn bộ resource?",answer:true,explanation:"PUT thay thế toàn bộ, PATCH cập nhật một phần."},
          {type:"order",difficulty:"intermediate",badge:"Sắp xếp",question:"Sắp xếp thứ tự xử lý request trong Spring Boot:",items:["Client gửi HTTP request","DispatcherServlet nhận request","HandlerMapping xác định Controller","Controller method xử lý","Service xử lý business logic","Repository truy vấn database"],answer:[0,1,2,3,4,5],explanation:"Request → DispatcherServlet → HandlerMapping → Controller → Service → Repository."},
          {type:"code",difficulty:"advanced",badge:"Thực hành",question:"Viết REST endpoint GET /api/greet trả về \"Hello World\"",template:"// Viết RestController với endpoint GET trả về \"Hello World\"\n",
          checks:[
            {regex:/@RestController/,hint:"Cần @RestController"},
            {regex:/@GetMapping|@RequestMapping\s*\(\s*(\"\/api\/greet\"|\/api\/greet)/,hint:"Cần @GetMapping(\"/api/greet\")"},
            {regex:/\"Hello World\"/,hint:"Trả về chuỗi \"Hello World\""}
          ],explanation:"@RestController + @GetMapping + return \"Hello World\";"}
        ]
      },
      // --- Configuration ---
      {
        id:"p2-config",title:"Spring Boot Configuration",
        lesson:[
          {type:"p",text:"Spring Boot cung cấp nhiều cách cấu hình application:"},
          {type:"ul",items:[
            "<b>application.properties</b>: <code>server.port=8081</code>",
            "<b>application.yml</b>: cấu trúc phân cấp, dễ đọc hơn.",
            "<b>@Value</b>: inject giá trị từ properties.",
            "<b>@ConfigurationProperties</b>: map nhóm properties vào POJO (type-safe).",
            "<b>Profiles</b>: <code>application-dev.yml</code>, <code>application-prod.yml</code> — active bằng <code>spring.profiles.active=dev</code>."
          ]},
          {type:"code",text:"# application.yml\nserver:\n  port: ${PORT:8080}\n\nspring:\n  application:\n    name: my-app\n  datasource:\n    url: ${DATABASE_URL}\n    driver-class-name: org.postgresql.Driver\n  jpa:\n    hibernate:\n      ddl-auto: validate\n    show-sql: false\n\napp:\n  jwt:\n    secret: ${JWT_SECRET}\n    expiration: 86400000"},
          {type:"code",text:"@ConfigurationProperties(prefix = \"app.jwt\")\n@Component\npublic class JwtProperties {\n    private String secret;\n    private long expiration;\n    // getters & setters\n}"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"File cấu hình dạng YAML có extension gì?",options:[".yaml",".yml","Cả A và B",".properties"],answer:2,explanation:"Cả .yaml và .yml đều được Spring Boot hỗ trợ."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Annotation nào map prefix properties vào class?",options:["@Value","@ConfigurationProperties","@PropertySource","@EnableConfigurationProperties"],answer:1,explanation:"@ConfigurationProperties map nhóm properties vào class."},
          {type:"fill",difficulty:"basic",badge:"Điền khuyết",question:"Kích hoạt profile 'dev': <code>spring.profiles.active=___</code>",expectedKeywords:["dev","dev\n","dev "],explanation:"spring.profiles.active=dev kích hoạt application-dev.properties."},
          {type:"truefalse",difficulty:"intermediate",badge:"Đúng/Sai",question:"application.yml có độ ưu tiên cao hơn application.properties?",answer:false,explanation:".properties có độ ưu tiên cao hơn .yml nếu cùng cấu hình."}
        ]
      },
      // --- Bean Scopes ---
      {
        id:"p2-scope",title:"Bean Scopes & Lifecycle",
        lesson:[
          {type:"p",text:"Spring Bean Scopes:"},
          {type:"ul",items:[
            "<b>singleton</b> (mặc định): một instance duy nhất cho toàn bộ application.",
            "<b>prototype</b>: tạo instance mới mỗi lần request bean.",
            "<b>request</b>: một instance cho mỗi HTTP request (web).",
            "<b>session</b>: một instance cho mỗi HTTP session (web).",
            "<b>application</b>: một instance cho mỗi ServletContext."
          ]},
          {type:"p",text:"<b>Bean Lifecycle Callbacks:</b>"},
          {type:"code",text:"@Component\npublic class MyBean {\n    \n    @PostConstruct\n    public void init() {\n        System.out.println(\"Bean initialized\");\n    }\n    \n    @PreDestroy\n    public void destroy() {\n        System.out.println(\"Bean destroyed\");\n    }\n}\n\n// Hoặc implements InitializingBean, DisposableBean"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Scope mặc định của Spring bean là gì?",options:["prototype","singleton","request","session"],answer:1,explanation:"singleton — một instance cho toàn bộ Spring container."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Annotation nào chạy sau khi bean được khởi tạo?",options:["@PreDestroy","@PostConstruct","@Bean","@Init"],answer:1,explanation:"@PostConstruct chạy sau khi dependency injection hoàn tất."},
          {type:"fill",difficulty:"basic",badge:"Điền khuyết",question:"Scope tạo bean mới mỗi lần: <code>@Scope(\"___\")</code>",expectedKeywords:["prototype","prototype\"","prototype\")"],explanation:"prototype — mỗi lần getBean() trả về instance mới."},
          {type:"truefalse",difficulty:"intermediate",badge:"Đúng/Sai",question:"Singleton bean là thread-safe mặc định?",answer:false,explanation:"Singleton bean không tự động thread-safe. Cần tự đồng bộ nếu có shared state."}
        ]
      },
      // --- Logging ---
      {
        id:"p2-logging",title:"Logging với SLF4J & Logback",
        lesson:[
          {type:"p",text:"Spring Boot dùng <b>SLF4J</b> (facade) + <b>Logback</b> (implementation) mặc định."},
          {type:"ul",items:[
            "Các level: <b>TRACE</b> &lt; <b>DEBUG</b> &lt; <b>INFO</b> &lt; <b>WARN</b> &lt; <b>ERROR</b>.",
            "Không dùng <code>System.out.println()</code> — dùng Logger.",
            "Dùng <code>lombok.extern.slf4j.Slf4j</code> hoặc tự tạo Logger."
          ]},
          {type:"code",text:"import org.slf4j.Logger;\nimport org.slf4j.LoggerFactory;\n\n@Service\npublic class UserService {\n    private static final Logger log = LoggerFactory.getLogger(UserService.class);\n    \n    public User create(CreateUserRequest req) {\n        log.info(\"Creating user: {}\", req.email());\n        try {\n            User user = userRepo.save(new User(req));\n            log.debug(\"User created with id: {}\", user.getId());\n            return user;\n        } catch (Exception e) {\n            log.error(\"Failed to create user: {}\", req.email(), e);\n            throw e;\n        }\n    }\n}\n\n// Với Lombok:\n// @Slf4j\n// @Service\n// public class UserService { ... }"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Logging implementation mặc định của Spring Boot?",options:["Log4j","Logback","Java Util Logging","SLF4J"],answer:1,explanation:"Logback là implementation mặc định (SLF4J là facade)."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Level log nào thấp nhất?",options:["DEBUG","TRACE","INFO","ERROR"],answer:1,explanation:"TRACE < DEBUG < INFO < WARN < ERROR."},
          {type:"fill",difficulty:"basic",badge:"Điền khuyết",question:"Annotation Lombok để có logger: <code>@___</code>",expectedKeywords:["Slf4j","Slf4j\n","@Slf4j"],explanation:"@Slf4j tự tạo field log cho class."},
          {type:"truefalse",difficulty:"basic",badge:"Đúng/Sai",question:"Dùng System.out.println() là best practice cho logging?",answer:false,explanation:"Không. Dùng Logger để có level, định dạng, và cấu hình linh hoạt."}
        ]
      },
      // --- Spring Framework Expert ---
      {
        id:"p2-expert",title:"Spring Framework Chuyên sâu (Phỏng vấn)",
        sources:[
          {name:"Spring.io — Building REST Services",url:"https://spring.io/guides/tutorials/rest/"},
          {name:"Baeldung — @Controller vs @RestController",url:"https://www.baeldung.com/spring-controller-vs-restcontroller"},
          {name:"Baeldung — Dependency Injection & SOLID",url:"https://www.baeldung.com/spring-dependency-injection"},
          {name:"Baeldung — Spring Profiles",url:"https://www.baeldung.com/spring-profiles"},
          {name:"Baeldung — @ConfigurationProperties vs @Value",url:"https://www.baeldung.com/configuration-properties-in-spring-boot"},
          {name:"Baeldung — Singleton Bean with Prototype",url:"https://www.baeldung.com/spring-inject-prototype-bean-into-singleton"}
        ],
        lesson:[
          {type:"p",text:"<b>1. @Controller vs @RestController</b> — câu hỏi phỏng vấn kinh điển:"},
          {type:"ul",items:[
            "<b>@Controller</b>: trả về View (JSP/Thymeleaf). Cần @ResponseBody trên từng method để trả JSON.",
            "<b>@RestController</b>: = @Controller + @ResponseBody mặc định trên mọi method. Chuyên cho REST API.",
            "<b>@RestControllerAdvice</b>: = @ControllerAdvice + @ResponseBody — xử lý exception toàn cục cho REST API."
          ]},
          {type:"p",text:"<b>2. DI trong Spring vs DI trong SOLID</b> — dễ nhầm lẫn:"},
          {type:"ul",items:[
            "<b>DI trong Spring (IoC)</b>: Spring container quản lý bean và inject dependencies. Constructor injection, setter injection, field injection.",
            "<b>DI trong SOLID (Dependency Inversion)</b>: module cấp cao không phụ thuộc module cấp thấp. Cả 2 phụ thuộc vào abstraction. Interface Injection.",
            "Ví dụ: UserService gọi EmailService → vi phạm DIP. Fix: UserService gọi NotificationService (interface), EmailService implement nó."
          ]},
          {type:"code",text:"// DI trong SOLID — Dependency Inversion Principle\n// ❌ Vi phạm: UserService phụ thuộc trực tiếp vào EmailService\npublic class UserService {\n    private EmailService emailService; // concrete class — vi phạm DIP\n}\n\n// ✅ Đúng: Cả 2 phụ thuộc vào abstraction\npublic interface NotificationService {\n    void send(String message);\n}\n\n@Service\npublic class EmailService implements NotificationService {}\n\n@Service\npublic class SMSService implements NotificationService {}\n\n@Service\npublic class UserService {\n    private final NotificationService notifier; // abstraction — đúng DIP\n    \n    public UserService(NotificationService notifier) { // Spring DI inject implementation\n        this.notifier = notifier;\n    }\n}"},
          {type:"p",text:"<b>3. Spring Profile</b> — cấu hình theo môi trường:"},
          {type:"ul",items:[
            "Tạo file: <code>application-dev.yml</code>, <code>application-prod.yml</code>, <code>application-test.yml</code>.",
            "Kích hoạt: <code>spring.profiles.active=dev</code> — qua application.yml, biến môi trường, hoặc argument <code>--spring.profiles.active=prod</code>.",
            "Có thể kích hoạt nhiều profile: <code>spring.profiles.active=dev,swagger</code>.",
            "Dùng <code>@Profile(\"dev\")</code> trên @Configuration hoặc @Component — chỉ load trong profile đó.",
            "Dùng <code>@ConditionalOnProperty</code> cho điều kiện phức tạp hơn (VD: feature flag)."
          ]},
          {type:"p",text:"<b>4. @ConfigurationProperties vs @Value</b>:"},
          {type:"ul",items:[
            "<b>@Value</b>: inject từng giá trị đơn lẻ. Cú pháp: <code>@Value(\"${app.name}\")</code>.",
            "<b>@ConfigurationProperties</b>: map cả nhóm properties vào POJO. Type-safe, hỗ trợ validation.",
            "Khi có nhiều properties cùng prefix, dùng @ConfigurationProperties sẽ clean hơn."
          ]},
          {type:"code",text:"// @ConfigurationProperties — type-safe\n@ConfigurationProperties(prefix = \"app.datasource\")\n@Component\npublic class DatasourceProperties {\n    private String url;\n    private String username;\n    private String password;\n    private int maxPoolSize = 10; // default\n    // getters & setters\n}\n\n// @Value — inject đơn lẻ\n@Service\npublic class AppService {\n    @Value(\"${app.name}\")\n    private String appName;\n    \n    @Value(\"${app.version:1.0.0}\")  // default value\n    private String version;\n}"},
          {type:"p",text:"<b>5. Spring Bean Scopes — so sánh nâng cao:</b>"},
          {type:"ul",items:[
            "Singleton vs Prototype với dependency injection: Nếu singleton bean inject prototype bean → cần <code>@Scope(proxyMode = ScopedProxyMode.TARGET_CLASS)</code> hoặc <code>ObjectFactory</code>.",
            "Request vs Session Scope: dùng <code>@Scope(value = \"request\", proxyMode = ScopedProxyMode.TARGET_CLASS)</code>."
          ]}
        ],
        exercises:[
          // CƠ BẢN
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Điểm khác biệt chính giữa @Controller và @RestController?",options:["@Controller không có @RequestMapping","@RestController = @Controller + @ResponseBody trên mọi method","@RestController chạy nhanh hơn","@Controller chỉ dùng cho HTML"],answer:1,explanation:"@RestController thêm @ResponseBody mặc định, mọi method trả JSON."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Spring DI khác SOLID DI ở điểm nào?",options:["Giống nhau hoàn toàn","Spring DI = IoC container inject bean; SOLID DI = phụ thuộc vào abstraction","Spring DI là interface injection","SOLID DI là constructor injection"],answer:1,explanation:"Spring DI là cơ chế IoC inject bean. SOLID DIP là nguyên lý: module phụ thuộc abstraction, không phụ thuộc concrete."},
          {type:"truefalse",difficulty:"basic",badge:"Lý thuyết",question:"@Controller có thể trả về JSON?",answer:true,explanation:"Có — thêm @ResponseBody trên method hoặc dùng @RestController."},
          {type:"truefalse",difficulty:"basic",badge:"Lý thuyết",question:"Dependency Inversion Principle (SOLID) nói: 'Class nên phụ thuộc vào class concrete'?",answer:false,explanation:"DIP nói: module cấp cao và cấp thấp đều phụ thuộc vào abstraction (interface)."},
          // TRUNG CẤP
          {type:"mcq",difficulty:"intermediate",badge:"Phỏng vấn",question:"Kích hoạt profile 'prod' qua argument dòng lệnh?",options:["-Dprofile=prod","--spring.profiles.active=prod","--profile=prod","-Pprod"],answer:1,explanation:"--spring.profiles.active=prod hoặc SPRING_PROFILES_ACTIVE=prod environment variable."},
          {type:"mcq",difficulty:"intermediate",badge:"Phỏng vấn",question:"Nên dùng @ConfigurationProperties khi nào?",options:["Khi inject 1 giá trị","Khi có nhiều properties cùng prefix, cần type-safe","Khi không muốn dùng getter/setter","Khi cần inject giá trị mặc định"],answer:1,explanation:"@ConfigurationProperties map prefix → POJO, type-safe, hỗ trợ @Validated."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Annotation chỉ load bean trong profile 'dev': <code>@___(\"dev\")</code>",expectedKeywords:["Profile","Profile(\"dev\")"],explanation:"@Profile(\"dev\") — bean chỉ được tạo khi profile active là dev."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Annotation cho feature flag: <code>@___OnProperty(name = \"feature.x.enabled\", havingValue = \"true\")</code>",expectedKeywords:["Conditional","ConditionalOnProperty"],explanation:"@ConditionalOnProperty — tạo bean có điều kiện dựa trên property."},
          // VẬN DỤNG CAO
          {type:"mcq",difficulty:"advanced",badge:"Vận dụng cao",question:"Singleton bean inject prototype bean. Kết quả?",options:["Prototype hoạt động bình thường","Prototype cũng là singleton (dùng lại instance)","Lỗi compile","Cần @Lazy"],answer:1,explanation:"Singleton tạo một lần → prototype cũng được inject một lần. Cần @Scope(proxyMode) hoặc ObjectFactory để có prototype mới mỗi lần."},
          {type:"code",difficulty:"advanced",badge:"Thực hành",question:"Viết @ConfigurationProperties cho prefix 'app.jwt' với các field: secret, expiration, issuer",template:"// ConfigurationProperties cho app.jwt\n@ConfigurationProperties(prefix = \"app.jwt\")\n@Component\npublic class JwtProperties {\n    \n}",
          checks:[
            {regex:/private\s+String\s+secret/,hint:"Cần field secret kiểu String"},
            {regex:/private\s+long\s+expiration|\d+/,hint:"Cần field expiration kiểu long/int"},
            {regex:/public\s+\w+\s+get\w+/,hint:"Cần getter cho các field"}
          ],explanation:"@ConfigurationProperties(prefix = \"app.jwt\") + private fields + getters/setters."}
        ]
      }
    ]
  },

  // ============================================================
  // PHASE 3: DATA LAYER
  // ============================================================
  {
    id:"phase-3",title:"Data Layer",icon:"🗄️",
    desc:"JPA, Entity Mapping, JPQL, Flyway, Transaction, Caching",
    topics:[
      // --- Spring Data JPA ---
      {
        id:"p3-jpa",title:"Spring Data JPA",
        lesson:[
          {type:"p",text:"Spring Data JPA giúp thao tác database tối giản — chỉ cần interface, không cần implement."},
          {type:"p",text:"<b>Key concepts:</b>"},
          {type:"ul",items:[
            "<b>Entity</b>: <code>@Entity</code>, <code>@Table</code>, <code>@Id</code>, <code>@GeneratedValue</code>.",
            "<b>Repository</b>: kế thừa <code>JpaRepository&lt;T, ID&gt;</code> — có sẵn CRUD + phân trang.",
            "<b>Derived Query Methods</b>: Spring tự implement dựa trên tên method.",
            "<b>@Query</b>: custom JPQL hoặc native SQL."
          ]},
          {type:"p",text:"<b>Derived query method patterns:</b>"},
          {type:"ul",items:[
            "<code>findBy{Property}</code> — vd: <code>findByEmail(String email)</code>",
            "<code>findBy{Property}Containing</code> — LIKE %value%",
            "<code>findBy{Property}Between</code> — BETWEEN",
            "<code>countBy{Property}</code> — đếm số lượng.",
            "<code>existsBy{Property}</code> — kiểm tra tồn tại.",
            "<code>findTop3ByOrderBy{Property}Desc</code> — top N."
          ]},
          {type:"code",text:"@Entity\n@Table(name = \"users\")\npublic class User {\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    \n    @Column(nullable = false, unique = true)\n    private String email;\n    \n    @Column(name = \"full_name\")\n    private String fullName;\n    \n    private int age;\n    private LocalDateTime createdAt;\n    \n    @PrePersist\n    void onCreate() { createdAt = LocalDateTime.now(); }\n    \n    // getters, setters\n}\n\npublic interface UserRepository extends JpaRepository<User, Long> {\n    Optional<User> findByEmail(String email);\n    List<User> findByAgeGreaterThanEqual(int age);\n    List<User> findByFullNameContainingIgnoreCase(String keyword);\n    long countByAgeGreaterThan(int age);\n}"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Interface Repository nào cung cấp đầy đủ CRUD + phân trang?",options:["CrudRepository","PagingAndSortingRepository","JpaRepository","Repository"],answer:2,explanation:"JpaRepository kế thừa CrudRepository + PagingAndSortingRepository, có đầy đủ chức năng."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Annotation đánh dấu trường primary key?",options:["@GeneratedValue","@Column","@Id","@PrimaryKey"],answer:2,explanation:"@Id xác định primary key của entity."},
          {type:"mcq",difficulty:"intermediate",badge:"Lý thuyết",question:"GenerationType nào IDENTITY dùng cho cơ sở dữ liệu gì?",options:["Auto-increment DB (MySQL, PostgreSQL)","Sequence (Oracle)","Table (phân tán)","UUID"],answer:0,explanation:"IDENTITY dùng auto-increment column, phổ biến với MySQL/PostgreSQL."},
          {type:"fill",difficulty:"basic",badge:"Điền khuyết",question:"Query method tìm user theo email: <code>Optional&lt;User&gt; findBy___</code>",expectedKeywords:["Email(String email)","Email","Email(String"],explanation:"findBy + Email → Spring JPA tự tạo query: WHERE email = ?"},
          {type:"truefalse",difficulty:"basic",badge:"Đúng/Sai",question:"Spring Data JPA yêu cầu entity phải có @NoArgsConstructor?",answer:true,explanation:"JPA cần constructor không tham số để tạo entity instance."},
          {type:"code",difficulty:"advanced",badge:"Thực hành",question:"Viết Entity Product với: id, name, price, created_at",template:"// Entity Product với các field: Long id, String name, double price, LocalDateTime createdAt\n",
          checks:[
            {regex:/@Entity/,hint:"Cần @Entity"},
            {regex:/@Id/,hint:"Cần @Id cho primary key"},
            {regex:/Long\s+id/,hint:"Cần field id kiểu Long"},
            {regex:/String\s+\w+\s+name/,hint:"Cần field name kiểu String"},
            {regex:/double|BigDecimal/,hint:"Cần field price kiểu số thực"}
          ],explanation:"Entity gồm @Id, @GeneratedValue, các field, getters/setters."}
        ]
      },
      // --- Entity Mapping ---
      {
        id:"p3-relations",title:"Entity Mapping & Relationships",
        lesson:[
          {type:"p",text:"JPA hỗ trợ 4 loại quan hệ giữa các Entity:"},
          {type:"ul",items:[
            "<b>@OneToOne</b>: 1-1. VD: User ↔ Profile. Dùng <code>@JoinColumn</code> ở phía sở hữu.",
            "<b>@OneToMany / @ManyToOne</b>: 1-nhiều. VD: User có nhiều Order. <b>Luôn dùng</b> @ManyToOne ở phía nhiều.",
            "<b>@ManyToMany</b>: nhiều-nhiều. VD: Student ↔ Course. Dùng <code>@JoinTable</code>."
          ]},
          {type:"p",text:"<b>Quan trọng:</b>"},
          {type:"ul",items:[
            "<code>mappedBy</code> — đặt ở phía không sở hữu, chỉ định field ở phía sở hữu.",
            "<code>cascade</code> — CascadeType.ALL, PERSIST, MERGE, REMOVE.",
            "<code>fetch</code> — LAZY (mặc định cho OneToMany/ManyToMany) hoặc EAGER.",
            "Tránh dùng EAGER — gây N+1 query. Dùng <code>@EntityGraph</code> hoặc JOIN FETCH."
          ]},
          {type:"code",text:"@Entity\npublic class User {\n    @Id @GeneratedValue\n    private Long id;\n    \n    @OneToMany(mappedBy = \"user\", cascade = CascadeType.ALL, orphanRemoval = true)\n    private List<Order> orders = new ArrayList<>();\n    \n    @OneToOne(mappedBy = \"user\", cascade = CascadeType.ALL)\n    private Profile profile;\n    \n    // Helper methods\n    public void addOrder(Order order) {\n        orders.add(order);\n        order.setUser(this);\n    }\n}\n\n@Entity\n@Table(name = \"orders\")\npublic class Order {\n    @Id @GeneratedValue\n    private Long id;\n    \n    @ManyToOne(fetch = FetchType.LAZY)\n    @JoinColumn(name = \"user_id\")\n    private User user;\n}"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Annotation cho quan hệ 1-nhiều ở phía 'một'?",options:["@OneToMany","@ManyToOne","@JoinColumn","@ManyToMany"],answer:0,explanation:"@OneToMany đặt ở phía 1 (User có nhiều Order)."},
          {type:"mcq",difficulty:"intermediate",badge:"Lý thuyết",question:"mappedBy dùng để làm gì?",options:["Xác định khoá ngoại","Chỉ định phía không sở hữu quan hệ","Cấu hình cascade","Định nghĩa join table"],answer:1,explanation:"mappedBy đặt ở phía không sở hữu, trỏ tới field ở phía sở hữu."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Fetch type mặc định của @OneToMany là gì?",options:["EAGER","LAZY","DEFAULT","NONE"],answer:1,explanation:"@OneToMany mặc định LAZY — chỉ load khi cần."},
          {type:"fill",difficulty:"basic",badge:"Điền khuyết",question:"Annotation xác định cột khoá ngoại: <code>@___ (name = \"user_id\")</code>",expectedKeywords:["JoinColumn","JoinColumn(name=\"user_id\")","JoinColumn(name"],explanation:"@JoinColumn xác định cột foreign key."},
          {type:"truefalse",difficulty:"intermediate",badge:"Đúng/Sai",question:"orphanRemoval = true tự động xoá child khi xoá khỏi collection?",answer:true,explanation:"orphanRemoval xoá entity con khỏi DB khi nó bị remove khỏi collection."},
          {type:"order",difficulty:"intermediate",badge:"Sắp xếp",question:"Sắp xếp cascade types từ ít đến nhiều ảnh hưởng:",items:["PERSIST","MERGE","REMOVE","ALL"],answer:[0,1,2,3],explanation:"PERSIST (lưu) → MERGE (cập nhật) → REMOVE (xoá) → ALL = tất cả."}
        ]
      },
      // --- JPQL & Native Query ---
      {
        id:"p3-query",title:"JPQL & Native Query",
        lesson:[
          {type:"p",text:"Khi derived method không đáp ứng, dùng @Query:"},
          {type:"code",text:"public interface UserRepository extends JpaRepository<User, Long> {\n    \n    // JPQL — truy vấn trên Entity (portable)\n    @Query(\"SELECT u FROM User u WHERE u.email LIKE %:domain\")\n    List<User> findByEmailDomain(@Param(\"domain\") String domain);\n    \n    // Với Pageable\n    @Query(\"SELECT u FROM User u WHERE u.age >= :minAge\")\n    Page<User> findByMinAge(@Param(\"minAge\") int age, Pageable pageable);\n    \n    // Native Query — SQL gốc\n    @Query(value = \"SELECT * FROM users WHERE age > :age\", nativeQuery = true)\n    List<User> findByAgeNative(@Param(\"age\") int age);\n    \n    // Modifying (UPDATE/DELETE)\n    @Modifying\n    @Transactional\n    @Query(\"UPDATE User u SET u.fullName = :name WHERE u.id = :id\")\n    int updateUserName(@Param(\"id\") Long id, @Param(\"name\") String name);\n    \n    // Projection\n    @Query(\"SELECT new com.example.dto.UserSummary(u.id, u.email) FROM User u\")\n    List<UserSummary> findAllSummaries();\n}"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"JPQL SELECT trên đối tượng nào?",options:["Bảng database","Entity Java class","Cả A và B","View"],answer:1,explanation:"JPQL truy vấn trên Entity (Java class), không phải bảng DB."},
          {type:"mcq",difficulty:"intermediate",badge:"Lý thuyết",question:"Cần annotation nào khi dùng @Query cho UPDATE?",options:["@Transactional","@Modifying","@Modifying + @Transactional","@Commit"],answer:2,explanation:"@Modifying + @Transactional cho UPDATE/DELETE query."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Truy vấn SQL thuần cần: <code>@Query(value = \"...\", ___ = true)</code>",expectedKeywords:["nativeQuery","nativeQuery = true","nativeQuery=true"],explanation:"nativeQuery = true báo Spring đây là SQL thuần."},
          {type:"fill",difficulty:"basic",badge:"Điền khuyết",question:"Annotation truyền tham số cho @Query: <code>@___(\"name\")</code>",expectedKeywords:["Param","Param(\"name\")","Param"],explanation:"@Param mapping tham số phương thức với named parameter trong query."},
          {type:"truefalse",difficulty:"basic",badge:"Đúng/Sai",question:"Native query dùng tên cột trong database, JPQL dùng tên field trong Entity?",answer:true,explanation:"Đúng! Native query = SQL gốc; JPQL = field entity."}
        ]
      },
      // --- Flyway ---
      {
        id:"p3-migration",title:"Database Migration (Flyway)",
        lesson:[
          {type:"p",text:"Flyway version-control cho database schema — đảm bảo đồng bộ giữa các môi trường."},
          {type:"ul",items:[
            "File migration: <code>src/main/resources/db/migration/</code>",
            "Format: <code>V{version}__{description}.sql</code> — VD: <code>V1__create_users.sql</code>",
            "Flyway tự động chạy migration theo thứ tự version.",
            "Mỗi migration chỉ chạy một lần — theo dõi qua bảng <code>flyway_schema_history</code>."
          ]},
          {type:"code",text:"-- V1__create_users.sql\nCREATE TABLE users (\n    id BIGINT AUTO_INCREMENT PRIMARY KEY,\n    email VARCHAR(255) NOT NULL UNIQUE,\n    full_name VARCHAR(255),\n    age INT DEFAULT 0,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\n-- V2__add_status_column.sql\nALTER TABLE users ADD COLUMN status VARCHAR(20) DEFAULT 'ACTIVE';\n\n-- V3__create_orders.sql\nCREATE TABLE orders (\n    id BIGINT AUTO_INCREMENT PRIMARY KEY,\n    user_id BIGINT NOT NULL,\n    total DECIMAL(10,2),\n    FOREIGN KEY (user_id) REFERENCES users(id)\n);"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"File migration Flyway đặt trong thư mục nào?",options:["src/main/resources/db/migration/","src/main/java/db/migration/","db/migration/","src/main/resources/flyway/"],answer:0,explanation:"Mặc định: src/main/resources/db/migration/."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Bảng nào Flyway dùng để theo dõi migration đã chạy?",options:["flyway_schema","flyway_history","flyway_schema_history","schema_history"],answer:2,explanation:"flyway_schema_history ghi lại lịch sử migration."},
          {type:"fill",difficulty:"basic",badge:"Điền khuyết",question:"Tên file migration version 1: <code>___1___create_users.sql</code>",expectedKeywords:["V1__","V"],explanation:"Format: V{version}__{description}.sql"},
          {type:"truefalse",difficulty:"intermediate",badge:"Đúng/Sai",question:"Flyway tự động chạy lại migration nếu file SQL bị sửa?",answer:false,explanation:"Flyway chỉ chạy migration một lần. Không tự chạy lại nếu file thay đổi."}
        ]
      },
      // --- Transaction ---
      {
        id:"p3-transaction",title:"Transaction Management",
        lesson:[
          {type:"p",text:"<code>@Transactional</code> — quản lý transaction tự động trong Spring."},
          {type:"ul",items:[
            "Đảm bảo ACID: Atomicity, Consistency, Isolation, Durability.",
            "Có thể đặt ở class hoặc method level.",
            "<b>Propagation</b>: REQUIRED (mặc định), REQUIRES_NEW, NESTED, SUPPORTS, NOT_SUPPORTED, NEVER, MANDATORY.",
            "<b>Isolation</b>: READ_UNCOMMITTED, READ_COMMITTED (mặc định PostgreSQL), REPEATABLE_READ, SERIALIZABLE.",
            "<b>rollbackFor</b>: chỉ rollback cho Exception cụ thể."
          ]},
          {type:"code",text:"@Service\n@Transactional(readOnly = true)\npublic class UserService {\n    \n    public User findById(Long id) {\n        return userRepo.findById(id)\n            .orElseThrow(() -> new NotFoundException(\"User not found\"));\n    }\n    \n    @Transactional\n    public User create(CreateUserRequest req) {\n        // Transaction tự động commit nếu không có exception\n        User user = new User(req);\n        user = userRepo.save(user);\n        emailService.sendWelcome(user.getEmail());\n        return user;\n    }\n    \n    @Transactional(rollbackFor = BusinessException.class)\n    public void processOrder(Long orderId) {\n        // Chỉ rollback khi BusinessException\n    }\n}"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Annotation quản lý transaction trong Spring?",options:["@Transaction","@Transactional","@Transact","@TransactionManagement"],answer:1,explanation:"@Transactional quản lý transaction cho method/class."},
          {type:"mcq",difficulty:"intermediate",badge:"Lý thuyết",question:"Propagation mặc định của @Transactional là gì?",options:["REQUIRES_NEW","REQUIRED","NESTED","SUPPORTS"],answer:1,explanation:"REQUIRED — dùng transaction hiện tại, tạo mới nếu không có."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Chế độ chỉ đọc: <code>@Transactional(___ = true)</code>",expectedKeywords:["readOnly","readOnly ","readOnly = true"],explanation:"readOnly = true tối ưu cho truy vấn, không cần flush."},
          {type:"truefalse",difficulty:"basic",badge:"Đúng/Sai",question:"@Transactional tự động rollback khi gặp checked exception?",answer:false,explanation:"Mặc định chỉ rollback cho RuntimeException và Error. Cần cấu hình rollbackFor cho checked exception."}
        ]
      },
      // --- Caching ---
      {
        id:"p3-cache",title:"Caching với Spring Cache",
        lesson:[
          {type:"p",text:"Spring Cache giảm tải database bằng cách cache kết quả method."},
          {type:"ul",items:[
            "<code>@EnableCaching</code> — bật caching ở config class.",
            "<code>@Cacheable(\"users\")</code> — cache kết quả method.",
            "<code>@CacheEvict(\"users\")</code> — xoá cache.",
            "<code>@CachePut(\"users\")</code> — cập nhật cache.",
            "Có thể dùng: ConcurrentMap, Redis, EhCache, Caffeine..."
          ]},
          {type:"code",text:"@Service\npublic class UserService {\n    \n    @Cacheable(value = \"users\", key = \"#id\")\n    public User findById(Long id) {\n        // Chỉ gọi DB khi cache miss\n        return userRepo.findById(id)\n            .orElseThrow(() -> new NotFoundException(\"User not found\"));\n    }\n    \n    @CacheEvict(value = \"users\", allEntries = true)\n    public void clearCache() {\n        // Xoá toàn bộ cache users\n    }\n    \n    @CachePut(value = \"users\", key = \"#user.id\")\n    public User update(User user) {\n        return userRepo.save(user);\n    }\n}"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Annotation bật caching trong Spring?",options:["@Cacheable","@EnableCaching","@CacheConfig","@Caching"],answer:1,explanation:"@EnableCaching đặt ở @Configuration class để bật caching."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Annotation nào cache kết quả method?",options:["@Cacheable","@CacheEvict","@CachePut","@Caching"],answer:0,explanation:"@Cacheable cache kết quả, dùng cache cho lần gọi sau."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Xoá toàn bộ cache: <code>@CacheEvict(all___ = true)</code>",expectedKeywords:["Entries","Entries ","Entries = true"],explanation:"allEntries = true xoá tất cả entries trong cache."},
          {type:"truefalse",difficulty:"basic",badge:"Đúng/Sai",question:"Spring Cache mặc định dùng Redis?",answer:false,explanation:"Spring Cache mặc định dùng ConcurrentHashMap (ConcurrentMapCacheManager)."}
        ]
      },
      // --- Database Deep Dive ---
      {
        id:"p3-db-deep",title:"Database Chuyên sâu (DDL/DML, INDEX, VIEW, TRUNCATE, UNION, TRIGGER, Performance)",
        sources:[
          {name:"PostgreSQL — Documentation",url:"https://www.postgresql.org/docs/current/"},
          {name:"Baeldung — Guide to JDBC",url:"https://www.baeldung.com/java-jdbc"},
          {name:"W3Schools — SQL Tutorial",url:"https://www.w3schools.com/sql/"},
          {name:"Use The Index, Luke!",url:"https://use-the-index-luke.com/"},
          {name:"Baeldung — Database Indexing",url:"https://www.baeldung.com/jpa-indexes"},
          {name:"PostgreSQL — EXPLAIN",url:"https://www.postgresql.org/docs/current/using-explain.html"}
        ],
        lesson:[
          {type:"p",text:"<b>1. DDL vs DML</b> — 2 nhóm lệnh SQL chính:"},
          {type:"ul",items:[
            "<b>DDL (Data Definition Language)</b>: định nghĩa cấu trúc — <code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>, <code>TRUNCATE</code>. Tự động commit.",
            "<b>DML (Data Manipulation Language)</b>: thao tác dữ liệu — <code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>. Cần COMMIT/ROLLBACK."
          ]},
          {type:"p",text:"<b>2. Primary Key vs Foreign Key</b>"},
          {type:"ul",items:[
            "<b>Primary Key</b>: unique, not null, định danh duy nhất một record trong bảng. Một bảng chỉ có một PK. Có thể là single column hoặc composite.",
            "<b>Foreign Key</b>: ràng buộc tham chiếu đến PK của bảng khác. Đảm bảo referential integrity. Có thể null, có thể trùng."
          ]},
          {type:"p",text:"<b>3. TRUNCATE vs DELETE</b> — câu hỏi phỏng vấn kinh điển:"},
          {type:"ul",items:[
            "<b>TRUNCATE</b>: DDL — xoá toàn bộ rows, không thể dùng WHERE, không log từng row, reset identity counter, không thể ROLLBACK (trong hầu hết DB), nhanh hơn.",
            "<b>DELETE</b>: DML — xoá từng row, có WHERE, log từng row, có thể ROLLBACK, không reset identity, chậm hơn.",
            "TRUNCATE dùng <code>ROLLBACK</code> được trong transaction (PostgreSQL, SQL Server hỗ trợ DDL trong transaction)."
          ]},
          {type:"code",text:"-- TRUNCATE vs DELETE\n-- DELETE: xoá từng row, có thể rollback\nBEGIN TRANSACTION;\nDELETE FROM users WHERE age < 18;\nROLLBACK; -- khôi phục dữ liệu\n\n-- TRUNCATE: xoá tất cả, nhanh hơn nhiều\nTRUNCATE TABLE logs; -- xoá hết, không thể WHERE\n\n-- UNION vs UNION ALL\n-- UNION: loại bỏ trùng lặp, chậm hơn\nSELECT city FROM customers\nUNION\nSELECT city FROM suppliers;  -- 1 query + sort + distinct\n\n-- UNION ALL: giữ tất cả, nhanh hơn\nSELECT city FROM customers\nUNION ALL\nSELECT city FROM suppliers;  -- 1 query, append trực tiếp"},
          {type:"p",text:"<b>4. UNION vs UNION ALL</b>"},
          {type:"ul",items:[
            "<b>UNION</b>: kết hợp kết quả 2+ queries, loại bỏ duplicate rows (mặc định sort để loại duplicate → chậm hơn).",
            "<b>UNION ALL</b>: kết hợp tất cả, giữ duplicate rows → nhanh hơn. Dùng khi biết 2 tập không trùng."
          ]},
          {type:"p",text:"<b>5. INDEX</b> — tối ưu tốc độ truy vấn:"},
          {type:"ul",items:[
            "<b>Clustered Index</b>: sắp xếp dữ liệu vật lý theo index key. Một bảng chỉ có 1 clustered index (mặc định là PK).",
            "<b>Non-Clustered Index</b>: cấu trúc riêng chứa index key + pointer đến data row. Một bảng có nhiều non-clustered index.",
            "INDEX tăng tốc SELECT, WHERE, JOIN, ORDER BY — nhưng chậm INSERT/UPDATE (vì phải cập nhật index).",
            "<b>Composite Index</b>: index trên nhiều column. Column đầu tiên (leading column) quan trọng nhất.",
            "<b>Covering Index</b>: index chứa tất cả column cần SELECT → không cần truy cập table (index-only scan)."
          ]},
          {type:"p",text:"<b>6. VIEW</b> — ảo, lưu câu truy vấn:"},
          {type:"ul",items:[
            "VIEW là bảng ảo — không lưu dữ liệu, chỉ lưu câu SELECT. Khi query VIEW, DB chạy câu SELECT gốc.",
            "<b>Materialized View</b>: lưu kết quả truy vấn dưới dạng bảng vật lý — có thể refresh định kỳ. Dùng cho dashboard, báo cáo.",
            "VIEW dùng để: bảo mật (che column nhạy cảm), đơn giản hoá query phức tạp, consistency."
          ]},
          {type:"p",text:"<b>7. TRIGGER</b> — tự động chạy khi có sự kiện:"},
          {type:"ul",items:[
            "Chạy tự động trước/sau INSERT, UPDATE, DELETE trên một bảng.",
            "VD: trigger BEFORE INSERT tự động sinh ID, trigger AFTER INSERT ghi audit log.",
            "Cẩn thận: trigger có thể gây side effect khó debug, ảnh hưởng performance."
          ]},
          {type:"p",text:"<b>8. Database Performance Tuning</b>"},
          {type:"ul",items:[
            "<b>EXPLAIN / EXPLAIN ANALYZE</b>: xem execution plan — phát hiện full table scan, sequential scan.",
            "<b>Chỉ mục (INDEX)</b>: thêm index cho column thường dùng trong WHERE, JOIN, ORDER BY.",
            "<b>Tránh SELECT *</b>: chỉ chọn column cần thiết → giảm I/O, có thể dùng covering index.",
            "<b>Phân trang hiệu quả</b>: thay vì OFFSET + LIMIT (quét tất cả rows trước offset), dùng keyset pagination (WHERE id > lastId).",
            "<b>JOIN vs Subquery</b>: JOIN thường nhanh hơn subquery. Dùng EXISTS thay vì IN cho subquery.",
            "<b>Connection Pool</b>: dùng HikariCP (mặc định Spring Boot) — cấu hình maximum-pool-size phù hợp.",
            "<b>Batch Insert</b>: gom nhiều INSERT thành một batch — giảm round-trip đến DB."
          ]},
          {type:"code",text:"-- EXPLAIN ANALYZE — xem execution plan\nEXPLAIN ANALYZE SELECT u.name, o.total\nFROM users u\nJOIN orders o ON u.id = o.user_id\nWHERE u.age > 18\nORDER BY o.total DESC;\n\n-- Tạo INDEX\nCREATE INDEX idx_users_age ON users(age);\nCREATE INDEX idx_orders_user_total ON orders(user_id, total DESC);\n\n-- Keyset Pagination (thay vì OFFSET)\n-- Cách cũ (chậm khi OFFSET lớn):\nSELECT * FROM orders ORDER BY id LIMIT 20 OFFSET 100000;\n-- Cách mới (nhanh):\nSELECT * FROM orders WHERE id > 100000 ORDER BY id LIMIT 20;\n\n-- VIEW\nCREATE VIEW user_order_summary AS\nSELECT u.id, u.name, COUNT(o.id) as order_count, SUM(o.total) as total_spent\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nGROUP BY u.id, u.name;\n\n-- TRIGGER (PostgreSQL)\nCREATE OR REPLACE FUNCTION log_order_changes()\nRETURNS TRIGGER AS $$\nBEGIN\n    INSERT INTO audit_log(table_name, action, record_id, changed_at)\n    VALUES ('orders', TG_OP, NEW.id, NOW());\n    RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql;\n\nCREATE TRIGGER trg_orders_audit\nAFTER INSERT OR UPDATE OR DELETE ON orders\nFOR EACH ROW EXECUTE FUNCTION log_order_changes();"}
        ],
        exercises:[
          // CƠ BẢN
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"TRUNCATE thuộc nhóm lệnh SQL nào?",options:["DML — Data Manipulation Language","DDL — Data Definition Language","DCL — Data Control Language","TCL — Transaction Control Language"],answer:1,explanation:"TRUNCATE là DDL — định nghĩa cấu trúc, không thể WHERE, tự động commit."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Clustered Index khác Non-Clustered Index thế nào?",options:["Giống nhau","Clustered sắp xếp dữ liệu vật lý, 1 bảng 1 clustered","Non-Clustered nhanh hơn","Clustered không thể có trên PK"],answer:1,explanation:"Clustered Index: sắp xếp vật lý, mặc định là PK, một bảng một cái. Non-Clustered: cấu trúc riêng, có thể nhiều."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"VIEW có lưu dữ liệu không?",options:["Có, như bảng thường","Không, chỉ lưu câu SELECT","Có, nếu là Materialized View","Không, VIEW chỉ ảo"],answer:2,explanation:"VIEW thường chỉ lưu câu query (ảo). Materialized View lưu kết quả vật lý."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"TRIGGER có thể tự động chạy khi nào?",options:["SELECT","INSERT, UPDATE, DELETE","CREATE, ALTER, DROP","Tất cả"],answer:1,explanation:"TRIGGER chạy trước/sau INSERT, UPDATE, DELETE. Không trigger cho SELECT hoặc DDL."},
          // TRUNG CẤP
          {type:"mcq",difficulty:"intermediate",badge:"Phỏng vấn",question:"Điểm khác biệt chính giữa TRUNCATE và DELETE?",options:["DELETE nhanh hơn","TRUNCATE có thể WHERE, DELETE không thể","TRUNCATE không log từng row, không thể WHERE, reset identity","DELETE là DDL, TRUNCATE là DML"],answer:2,explanation:"TRUNCATE: DDL, xoá toàn bộ, không WHERE, không log row, reset identity, nhanh. DELETE: DML, có WHERE, log row, có rollback."},
          {type:"mcq",difficulty:"intermediate",badge:"Phỏng vấn",question:"UNION khác UNION ALL thế nào?",options:["UNION chỉ dùng cho SELECT","UNION loại bỏ duplicate, UNION ALL giữ tất cả","UNION ALL loại bỏ duplicate","Giống nhau"],answer:1,explanation:"UNION: sort + distinct → loại duplicate. UNION ALL: append trực tiếp → giữ duplicate, nhanh hơn."},
          {type:"mcq",difficulty:"intermediate",badge:"Phỏng vấn",question:"Làm thế nào để kiểm tra performance của câu query?",options:["Chạy và đếm thời gian","EXPLAIN ANALYZE","Đo CPU usage","Tất cả đều đúng"],answer:1,explanation:"EXPLAIN ANALYZE cho execution plan + thời gian thực tế — giúp phát hiện bottleneck."},
          {type:"mcq",difficulty:"intermediate",badge:"Phỏng vấn",question:"Kỹ thuật phân trang nào hiệu quả hơn OFFSET + LIMIT?",options:["LIMIT + OFFSET","Keyset pagination (WHERE id > lastId)","ORDER BY RANDOM()","Dùng subquery"],answer:1,explanation:"Keyset pagination: WHERE id > lastId LIMIT n — không quét rows trước offset, O(1) thay vì O(n)."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Composite index: index trên nhiều ___",expectedKeywords:["column","columns","cột"],explanation:"Composite index = index trên 2+ column. Leading column là column đầu tiên."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Covering index chứa tất cả column trong ___ — không cần truy cập table.",expectedKeywords:["SELECT","query","WHERE"],explanation:"Covering index: index chứa tất cả column được SELECT → index-only scan."},
          {type:"truefalse",difficulty:"intermediate",badge:"Phỏng vấn",question:"INDEX luôn tăng tốc độ truy vấn?",answer:false,explanation:"INDEX tăng SELECT, WHERE, JOIN nhưng chậm INSERT/UPDATE/DELETE. Không nên index column ít thay đổi."},
          {type:"truefalse",difficulty:"intermediate",badge:"Phỏng vấn",question:"Một bảng có thể có nhiều clustered index?",answer:false,explanation:"Một bảng chỉ có 1 clustered index (sắp xếp dữ liệu vật lý). Có thể có nhiều non-clustered index."},
          {type:"truefalse",difficulty:"intermediate",badge:"Phỏng vấn",question:"TRUNCATE có thể ROLLBACK được trong PostgreSQL?",answer:true,explanation:"PostgreSQL hỗ trợ DDL trong transaction → TRUNCATE có thể ROLLBACK. MySQL/MariaDB thì không."},
          // VẬN DỤNG CAO
          {type:"code",difficulty:"advanced",badge:"Thực hành",question:"Viết câu truy vấn tìm tất cả users có ít nhất 1 order, dùng EXISTS",template:"-- Tìm users có ít nhất 1 order\nSELECT u.id, u.name\nFROM users u\nWHERE ___ (SELECT 1 FROM orders o WHERE o.user_id = u.id)",
          language:"sql",
          checks:[
            {regex:/EXISTS/i,hint:"Dùng EXISTS cho subquery"},
            {regex:/SELECT\s+1/i,hint:"EXISTS (SELECT 1 ...) là pattern chuẩn"}
          ],explanation:"WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id)"},
          {type:"code",difficulty:"advanced",badge:"Thực hành",question:"Viết câu tạo INDEX cho column email của bảng users",template:"-- Tạo index cho email\n",
          language:"sql",
          checks:[
            {regex:/CREATE\s+INDEX/i,hint:"Cần CREATE INDEX"},
            {regex:/ON\s+users\s*\(/i,hint:"Cần ON users(email)"},
            {regex:/email/i,hint:"Cần index trên column email"}
          ],explanation:"CREATE INDEX idx_users_email ON users(email);"},
          {type:"mcq",difficulty:"advanced",badge:"Vận dụng cao",question:"Khi nào nên dùng EXISTS thay vì IN?",options:["Khi subquery trả về nhiều kết quả","Khi subquery trả về NULL","EXISTS luôn nhanh hơn IN","Khi cần kiểm tra tồn tại, NOT IN có vấn đề với NULL"],answer:3,explanation:"NOT IN trả về FALSE nếu subquery có NULL. EXISTS/ NOT EXISTS an toàn hơn và thường nhanh hơn."}
        ]
      }
    ]
  },

  // ============================================================
  // PHASE 4: SECURITY & VALIDATION
  // ============================================================
  {
    id:"phase-4",title:"Security & Validation",icon:"🔒",
    desc:"Spring Security, JWT, Authorization, OAuth2, Bean Validation",
    topics:[
      // --- Spring Security & JWT ---
      {
        id:"p4-security",title:"Spring Security & JWT",
        lesson:[
          {type:"p",text:"Spring Security cung cấp authentication (xác thực) + authorization (phân quyền)."},
          {type:"p",text:"<b>JWT (JSON Web Token)</b> gồm 3 phần: Header . Payload . Signature."},
          {type:"ul",items:[
            "<b>Header</b>: loại token, thuật toán ký (HS256, RS256).",
            "<b>Payload</b>: claims (sub, exp, roles...).",
            "<b>Signature</b>: xác minh token không bị giả mạo.",
            "Stateless — không cần lưu session trên server."
          ]},
          {type:"p",text:"<b>Luồng xác thực JWT:</b>"},
          {type:"ol",items:[
            "Client gửi POST /api/auth/login với username/password.",
            "Server kiểm tra thông tin, trả về JWT token.",
            "Client lưu token (localStorage/httpOnly cookie).",
            "Client gửi token trong header <code>Authorization: Bearer &lt;token&gt;</code>.",
            "JwtFilter kiểm tra token, set SecurityContext."
          ]},
          {type:"code",text:"@Configuration\n@EnableWebSecurity\npublic class SecurityConfig {\n    \n    @Bean\n    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {\n        http\n            .csrf(csrf -> csrf.disable())\n            .sessionManagement(sm -> sm.sessionCreationPolicy(STATELESS))\n            .authorizeHttpRequests(auth -> auth\n                .requestMatchers(\"/api/auth/**\").permitAll()\n                .requestMatchers(\"/api/admin/**\").hasRole(\"ADMIN\")\n                .anyRequest().authenticated()\n            )\n            .authenticationProvider(authenticationProvider())\n            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);\n        return http.build();\n    }\n}"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"JWT gồm mấy phần?",options:["2","3","4","5"],answer:1,explanation:"JWT gồm 3 phần: Header.Payload.Signature."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Header Authorization cho JWT có format gì?",options:["Token <value>","Bearer <value>","JWT <value>","Auth <value>"],answer:1,explanation:"Authorization: Bearer <jwt_token>"},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Method nào cho phép endpoint public?",options:["authenticated()","permitAll()","denyAll()","hasRole()"],answer:1,explanation:"permitAll() — không cần xác thực."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"JWT filter thường extends: <code>extends ___</code>",expectedKeywords:["OncePerRequestFilter","OncePerRequestFilter","OncePerRequestFilter {"],explanation:"OncePerRequestFilter — đảm bảo chạy một lần mỗi request."},
          {type:"truefalse",difficulty:"basic",badge:"Đúng/Sai",question:"JWT là stateless authentication?",answer:true,explanation:"JWT chứa đủ thông tin trong token, server không cần lưu session."},
          {type:"code",difficulty:"advanced",badge:"Thực hành",question:"Viết SecurityFilterChain cho phép /api/public/**, yêu cầu auth cho /api/** còn lại",template:"// Cấu hình SecurityFilterChain với permitAll cho /api/public/**\n\n@Bean\npublic SecurityFilterChain filterChain(HttpSecurity http) {\n",
          checks:[
            {regex:/permitAll/,hint:"Cần permitAll() cho /api/public/**"},
            {regex:/authenticated/,hint:"Cần authenticated() cho các request còn lại"},
            {regex:/anyRequest/,hint:"Dùng .anyRequest().authenticated()"}
          ],explanation:".requestMatchers(\"/api/public/**\").permitAll().anyRequest().authenticated()"}
        ]
      },
      // --- Authorization ---
      {
        id:"p4-authorization",title:"Role-based Authorization",
        lesson:[
          {type:"p",text:"Phân quyền trong Spring Security:"},
          {type:"ul",items:[
            "<b>Method-level security</b>: <code>@EnableMethodSecurity</code>.",
            "<code>@PreAuthorize(\"hasRole('ADMIN')\")</code> — kiểm tra role.",
            "<code>@PreAuthorize(\"hasAuthority('WRITE')\")</code> — kiểm tra authority.",
            "<code>@Secured(\"ROLE_ADMIN\")</code> — cách cũ.",
            "<code>@PostAuthorize</code> — kiểm tra sau khi method chạy."
          ]},
          {type:"code",text:"@EnableMethodSecurity\n@Configuration\npublic class MethodSecurityConfig {}\n\n@RestController\n@RequestMapping(\"/api/admin\")\npublic class AdminController {\n    \n    @GetMapping(\"/users\")\n    @PreAuthorize(\"hasRole('ADMIN')\")\n    public List<User> getAllUsers() {\n        return userService.findAll();\n    }\n    \n    @DeleteMapping(\"/users/{id}\")\n    @PreAuthorize(\"hasAuthority('DELETE_USER')\")\n    public void deleteUser(@PathVariable Long id) {\n        userService.delete(id);\n    }\n    \n    @GetMapping(\"/dashboard\")\n    @PostAuthorize(\"returnObject.owner == authentication.name\")\n    public Dashboard getDashboard() {\n        // Chỉ chủ sở hữu mới xem được\n    }\n}"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Annotation bật method-level security?",options:["@EnableSecurity","@EnableMethodSecurity","@EnableGlobalMethodSecurity","@MethodSecurity"],answer:1,explanation:"@EnableMethodSecurity (Spring Security 6+)."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Annotation kiểm tra quyền trước khi method chạy?",options:["@PostAuthorize","@Secured","@PreAuthorize","@RolesAllowed"],answer:2,explanation:"@PreAuthorize kiểm tra trước khi method được gọi."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Kiểm tra role ADMIN: <code>@PreAuthorize(\"___\")</code>",expectedKeywords:["hasRole('ADMIN')","hasRole('ADMIN')\"","hasRole(\"ADMIN\")"],explanation:"hasRole('ADMIN') kiểm tra role ADMIN."},
          {type:"truefalse",difficulty:"basic",badge:"Đúng/Sai",question:"@PostAuthorize kiểm tra quyền sau khi method chạy?",answer:true,explanation:"@PostAuthorize kiểm tra sau khi method thực thi, dùng returnObject để kiểm tra."}
        ]
      },
      // --- Validation ---
      {
        id:"p4-validation",title:"Bean Validation & Exception Handler",
        lesson:[
          {type:"p",text:"Jakarta Bean Validation (trước là Javax) cung cấp annotation để validate dữ liệu đầu vào."},
          {type:"p",text:"<b>Các annotation phổ biến:</b>"},
          {type:"ul",items:[
            "<code>@NotBlank</code>: không null và có ít nhất 1 ký tự (trim).",
            "<code>@NotEmpty</code>: không null và không rỗng.",
            "<code>@NotNull</code>: không null.",
            "<code>@Size(min, max)</code>: giới hạn độ dài.",
            "<code>@Email</code>: định dạng email.",
            "<code>@Pattern(regexp)</code>: kiểm tra regex.",
            "<code>@Min / @Max</code>: giới hạn số.",
            "<code>@Valid</code>: kích hoạt validation trên object."
          ]},
          {type:"p",text:"<b>Global Exception Handler:</b>"},
          {type:"code",text:"@RestControllerAdvice\npublic class GlobalExceptionHandler {\n    \n    @ExceptionHandler(MethodArgumentNotValidException.class)\n    public ResponseEntity<Map<String, String>> handleValidation(\n            MethodArgumentNotValidException ex) {\n        Map<String, String> errors = new LinkedHashMap<>();\n        ex.getBindingResult().getFieldErrors().forEach(err ->\n            errors.put(err.getField(), err.getDefaultMessage()));\n        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);\n    }\n    \n    @ExceptionHandler(ResourceNotFoundException.class)\n    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {\n        return ResponseEntity.status(HttpStatus.NOT_FOUND)\n            .body(new ErrorResponse(404, ex.getMessage()));\n    }\n}"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Annotation nào kiểm tra chuỗi không null, không rỗng, có ít nhất 1 ký tự?",options:["@NotNull","@NotEmpty","@NotBlank","@Size(min=1)"],answer:2,explanation:"@NotBlank: không null, length > 0 sau khi trim."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Annotation xử lý exception trên toàn bộ controller?",options:["@ExceptionHandler","@ControllerAdvice","@RestControllerAdvice","Cả B và C"],answer:3,explanation:"@ControllerAdvice hoặc @RestControllerAdvice cho global exception handling."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Kích hoạt validation: <code>@___ @RequestBody User user</code>",expectedKeywords:["Valid","Valid\n","@Valid"],explanation:"@Valid kích hoạt Bean Validation trên request body."},
          {type:"truefalse",difficulty:"basic",badge:"Đúng/Sai",question:"@Email chỉ kiểm tra format, không kiểm tra domain có tồn tại?",answer:true,explanation:"@Email chỉ validate định dạng (có @, có domain), không kiểm tra email thật."},
          {type:"code",difficulty:"advanced",badge:"Thực hành",question:"Viết DTO CreateUserRequest với validation: name NotBlank, email Email, age Min 18",template:"// DTO với validation annotations\npublic record CreateUserRequest(\n",
          checks:[
            {regex:/@NotBlank/,hint:"Cần @NotBlank cho name"},
            {regex:/@Email/,hint:"Cần @Email cho email"},
            {regex:/@Min\s*\(\s*18\s*\)/,hint:"Cần @Min(18) cho age"}
          ],explanation:"record hoặc class với @NotBlank, @Email, @Min + @Valid ở controller."}
        ]
      },
      // --- OAuth2 ---
      {
        id:"p4-oauth2",title:"OAuth2 & Social Login",
        lesson:[
          {type:"p",text:"OAuth2 — giao thức uỷ quyền cho phép login qua Google, Facebook, GitHub..."},
          {type:"ul",items:[
            "<b>Authorization Code Flow</b> (dùng cho web apps):",
            "  1. User click \"Login with Google\"",
            "  2. Redirect đến Google's auth server",
            "  3. User đăng nhập, đồng ý",
            "  4. Google redirect về app với authorization code",
            "  5. App trao đổi code lấy access token",
            "  6. Dùng token gọi Google API lấy user info"
          ]},
          {type:"code",text:"# application.yml\nspring:\n  security:\n    oauth2:\n      client:\n        registration:\n          google:\n            client-id: ${GOOGLE_CLIENT_ID}\n            client-secret: ${GOOGLE_CLIENT_SECRET}\n            scope:\n              - email\n              - profile\n          github:\n            client-id: ${GITHUB_CLIENT_ID}\n            client-secret: ${GITHUB_CLIENT_SECRET}"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"OAuth2 flow phổ biến cho web app?",options:["Implicit Flow","Authorization Code Flow","Client Credentials Flow","Resource Owner Flow"],answer:1,explanation:"Authorization Code Flow — an toàn nhất cho web apps."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Spring Boot dùng dependency nào cho OAuth2 client?",options:["spring-boot-starter-security","spring-boot-starter-oauth2-client","spring-security-oauth2","spring-social"],answer:1,explanation:"spring-boot-starter-oauth2-client hỗ trợ social login."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Spring Security class lấy thông tin user OAuth2: <code>OAuth2___</code>",expectedKeywords:["User","User","User "],explanation:"OAuth2User — chứa thông tin user từ OAuth2 provider."},
          {type:"truefalse",difficulty:"basic",badge:"Đúng/Sai",question:"OAuth2 là giao thức authentication (xác thực)?",answer:false,explanation:"OAuth2 là giao thức authorization (uỷ quyền), nhưng thường dùng để xác thực qua social login."}
        ]
      }
    ]
  },

  // ============================================================
  // PHASE 5: FINAL PROJECT
  // ============================================================
  {
    id:"phase-5",title:"Dự án cuối khoá",icon:"🎯",
    desc:"Kiến trúc, Testing, Docker, Actuator, Swagger, Deploy",
    topics:[
      // --- Architecture ---
      {
        id:"p5-arch",title:"Kiến trúc & Design Pattern",
        lesson:[
          {type:"p",text:"<b>3-Layer Architecture</b> — chuẩn cho Spring Boot:"},
          {type:"ul",items:[
            "<b>Controller Layer</b>: nhận request, trả response. Gọi Service.",
            "<b>Service Layer</b>: business logic. Gọi Repository.",
            "<b>Repository Layer</b>: tương tác database."
          ]},
          {type:"p",text:"<b>DTO Pattern</b>: tách Entity khỏi Request/Response — tránh lộ dữ liệu nội bộ, giảm coupling."},
          {type:"p",text:"<b>Một số design pattern thường dùng:</b>"},
          {type:"ul",items:[
            "<b>Builder</b>: tạo object phức tạp (Lombok @Builder).",
            "<b>Factory</b>: tạo đối tượng mà không chỉ định class cụ thể.",
            "<b>Strategy</b>: thay đổi thuật toán tại runtime.",
            "<b>Observer</b>: publish-subscribe event (ApplicationEventPublisher)."
          ]},
          {type:"code",text:"// DTO pattern\npublic record CreateUserRequest(\n    @NotBlank String name,\n    @Email String email\n) {}\n\npublic record UserResponse(\n    Long id,\n    String name,\n    String email,\n    LocalDateTime createdAt\n) {}\n\n// Service mapping\n@Service\npublic class UserService {\n    public UserResponse create(CreateUserRequest req) {\n        User user = new User(req.name(), req.email());\n        user = userRepo.save(user);\n        return new UserResponse(user.getId(), user.getName(),\n            user.getEmail(), user.getCreatedAt());\n    }\n}"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"DTO viết tắt của?",options:["Data Transfer Object","Direct Table Object","Domain Type Object","Data Type Operation"],answer:0,explanation:"DTO — Data Transfer Object, truyền dữ liệu giữa các tầng."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Tầng nào trong 3-layer chứa business logic?",options:["Controller","Service","Repository","Entity"],answer:1,explanation:"Service layer xử lý business logic."},
          {type:"mcq",difficulty:"intermediate",badge:"Lý thuyết",question:"Pattern nào dùng để giảm số lượng object constructor parameters?",options:["Factory","Builder","Singleton","Prototype"],answer:1,explanation:"Builder pattern (ví dụ: Lombok @Builder) xây dựng object step by step."},
          {type:"truefalse",difficulty:"basic",badge:"Đúng/Sai",question:"DTO và Entity nên dùng chung class?",answer:false,explanation:"Không — DTO riêng giúp tách biệt API contract khỏi persistence model."},
          {type:"order",difficulty:"intermediate",badge:"Sắp xếp",question:"Sắp xếp luồng request theo 3-layer:",items:["Controller nhận request","Controller gọi Service","Service xử lý business logic","Service gọi Repository","Repository truy vấn DB","Trả response qua Controller"],answer:[0,1,2,3,4,5],explanation:"Controller → Service → Repository → DB → Service → Controller → Client."}
        ]
      },
      // --- Project Guide ---
      {
        id:"p5-project-guide",title:"Hướng dẫn làm Project thực tế",
        lesson:[
          {type:"p",text:"<b>Quy trình làm 1 project Spring Boot từ A-Z</b> (theo tài liệu khoá học Microservices):"},
          {type:"p",text:"<b>Bước 1: Thiết kế Database & Tạo Project</b>"},
          {type:"ul",items:[
            "Vẽ ERD, tạo script SQL (CREATE TABLE, relationships).",
            "Tạo project Maven với dependencies: Spring Web, JPA, MySQL, Security.",
            "Cấu hình <code>application.yml</code>: datasource, jpa (ddl-auto: none), hibernate dialect.",
            "Mapping Entity từ DB — dùng <code>@Entity</code>, <code>@Table</code>, <code>@Column</code>.",
            "Tạo Repository interface extends JpaRepository."
          ]},
          {type:"p",text:"<b>Bước 2: Xây dựng 3-Layer Architecture</b>"},
          {type:"code",text:"// 1. Repository layer\n@Repository\npublic interface UserRepository extends JpaRepository<User, Long> {\n    Optional<User> findByUsername(String username);\n}\n\n// 2. Service layer — tạo interface + implementation\n// interface (trong package service/imp/)\npublic interface UserServiceImp {\n    UserResponse login(LoginRequest req);\n    UserResponse signUp(SignUpRequest req);\n}\n\n// implementation\n@Service\npublic class UserService implements UserServiceImp {\n    @Autowired\n    private UserRepository userRepo;\n    // business logic\n}\n\n// 3. Controller layer — autowired interface (tính đa hình)\n@RestController\n@RequestMapping(\"/api/users\")\npublic class UserController {\n    @Autowired\n    private UserServiceImp userService; // Spring tự inject UserService\n}"},
          {type:"p",text:"<b>Bước 3: DTO & Payload Pattern</b>"},
          {type:"ul",items:[
            "Tạo package <code>payload</code> chứa: <code>ResponseData</code> (format JSON chung), các <code>Request</code> classes.",
            "Tạo package <code>dto</code> chứa các DTO — chỉ trả về những field cần thiết, tránh vòng lặp vô tận (thay vì @JsonIgnore).",
            "<b>ResponseData</b>: class quy định format JSON response — gồm status, message, data, success flag."
          ]},
          {type:"p",text:"<b>Bước 4: Xử lý CORS</b>"},
          {type:"code",text:"// CORS — cho phép FE gọi API\n// Option 1: @CrossOrigin trên Controller\n@CrossOrigin(origins = \"*\")\n@RestController\npublic class UserController {}\n\n// Option 2: Global CORS Config\n@Configuration\npublic class CorsConfig implements WebMvcConfigurer {\n    @Override\n    public void addCorsMappings(CorsRegistry reg) {\n        reg.addMapping(\"/**\")\n            .allowedOrigins(\"http://localhost:3000\")\n            .allowedMethods(\"*\");\n    }\n}"},
          {type:"p",text:"<b>Bước 5: Spring Security & JWT</b>"},
          {type:"ol",items:[
            "Tạo package <code>Security</code> → <code>CustomFilterSecurity</code>.",
            "Cấu hình <code>permitAll()</code> cho /login, /signup — <code>anyRequest().authenticated()</code>.",
            "Mã hoá password với <code>BCryptPasswordEncoder</code>.",
            "Custom <code>UserDetailsService</code> — query DB thay vì InMemoryUser.",
            "Tạo <code>JwtUtilHelper</code> — lấy privateKey từ application.yml, tạo hàm <code>generateToken()</code>, <code>verifyToken()</code>.",
            "Thêm JWT filter trong SecurityConfig — kiểm tra JWT mỗi request."
          ]},
          {type:"code",text:"// Security Config\n@Configuration\n@EnableWebSecurity\npublic class SecurityConfig {\n    @Bean\n    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {\n        http.csrf(csrf -> csrf.disable())\n            .sessionManagement(sm -> sm.sessionCreationPolicy(STATELESS))\n            .authorizeHttpRequests(auth -> auth\n                .requestMatchers(\"/api/auth/**\").permitAll()\n                .anyRequest().authenticated()\n            )\n            .authenticationProvider(authProvider())\n            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);\n        return http.build();\n    }\n}\n\n// JWT Util\n@Component\npublic class JwtUtilHelper {\n    @Value(\"${jwt.privateKey}\")\n    private String privateKey;\n    \n    public String generateToken(String username) {\n        // Tạo secretKey từ privateKey\n        // Tạo JWT với subject = username\n    }\n    \n    public boolean verifyToken(String token) {\n        // Giải mã token, kiểm tra hợp lệ\n    }\n}"},
          {type:"p",text:"<b>Bước 6: Logging với Logback</b>"},
          {type:"ul",items:[
            "Cấu hình <code>logback-spring.xml</code> trong resources.",
            "2 appenders: <b>Console</b> (hiển thị terminal) và <b>RollingFile</b> (ghi file, max 100MB/file).",
            "5 levels: TRACE → DEBUG → INFO → WARN → ERROR.",
            "Default level: INFO."
          ]},
          {type:"p",text:"<b>Bước 7: Caching & Redis</b>"},
          {type:"ul",items:[
            "Dùng <code>@Cacheable</code> cho dữ liệu ít thay đổi, <code>@CacheEvict</code> khi xoá cache.",
            "Tích hợp Redis: thêm dependency (Spring Data Redis + Lettuce), cấu hình RedisTemplate.",
            "Dùng Gson chuyển Object ↔ JSON khi lưu Redis.",
            "Redis dùng HDD/SSD, có TTL — tối ưu hơn lưu trong RAM."
          ]},
          {type:"p",text:"<b>Bước 8: Upload File & Microservices</b>"},
          {type:"ul",items:[
            "Cấu hình upload path — tham khảo bezkoder.com Spring Boot file upload.",
            "Tách project thành nhiều service — mỗi service là 1 Spring Boot app riêng.",
            "Dùng Spring Cloud Gateway để route request đến service phù hợp.",
            "Tìm hiểu Netflix Eureka cho service discovery."
          ]},
          {type:"code",text:"// application.yml — Spring Cloud Gateway\nspring:\n  cloud:\n    gateway:\n      routes:\n        - id: user-service\n          uri: http://localhost:8081\n          predicates:\n            - Path=/api/users/**\n        - id: order-service\n          uri: http://localhost:8082\n          predicates:\n            - Path=/api/orders/**"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Thực hành",question:"Thứ tự đúng của 3-layer architecture trong Spring?",options:["Controller → Repository → Service","Controller → Service → Repository","Service → Controller → Repository","Repository → Service → Controller"],answer:1,explanation:"Controller → Service → Repository. Controller gọi Service, Service gọi Repository."},
          {type:"mcq",difficulty:"intermediate",badge:"Thực hành",question:"Tại sao tạo interface Service rồi mới implement?",options:["Để chạy nhanh hơn","Áp dụng tính đa hình, dễ bảo trì, DI linh hoạt","Vì Spring bắt buộc","Để giảm code"],answer:1,explanation:"Interface + implementation → polymorphic injection, dễ đổi implementation mà không sửa controller."},
          {type:"mcq",difficulty:"intermediate",badge:"Thực hành",question:"Lợi ích của DTO pattern so với @JsonIgnore?",options:["Viết code nhanh hơn","Kiểm soát chính xác dữ liệu trả về, tránh lộ entity","Entity tự động convert","Không cần getter/setter"],answer:1,explanation:"DTO định nghĩa chính xác field nào trả về, không liên quan đến entity — an toàn và sạch hơn @JsonIgnore."},
          {type:"mcq",difficulty:"basic",badge:"Thực hành",question:"@CrossOrigin(origins = \"*\") dùng để làm gì?",options:["Tăng tốc API","Cho phép domain khác gọi API","Mã hoá dữ liệu","Chặn truy cập"],answer:1,explanation:"CORS cho phép frontend ở domain khác gọi API Spring Boot."},
          {type:"mcq",difficulty:"basic",badge:"Thực hành",question:"Spring Security mặc định chặn lỗi bảo mật nào liên quan đến cookie?",options:["CORS","CSRF","XSS","SQL Injection"],answer:1,explanation:"CSRF — Spring Security mặc định chặn giả mạo request cookie."},
          {type:"fill",difficulty:"basic",badge:"Điền khuyết",question:"Annotation cho phép truy cập không cần auth: <code>.requestMatchers(\"/api/public/**\").___()</code>",expectedKeywords:["permitAll","permitAll()"],explanation:"permitAll() — không yêu cầu xác thực cho đường dẫn này."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Spring Security mã hoá password với: <code>new ___()</code>",expectedKeywords:["BCryptPasswordEncoder","BCryptPasswordEncoder()"],explanation:"BCryptPasswordEncoder — thuật toán mã hoá password một chiều."},
          {type:"truefalse",difficulty:"basic",badge:"Thực hành",question:"Nên viết hết logic business trong Controller?",answer:false,explanation:"Không! Controller chỉ nhận request, gửi response. Business logic viết trong Service."},
          {type:"truefalse",difficulty:"intermediate",badge:"Thực hành",question:"Redis lưu cache trên RAM, mất khi server restart?",answer:false,explanation:"Redis lưu trên HDD/SSD, có persistence — không mất khi restart (có thể set TTL)."},
          {type:"order",difficulty:"intermediate",badge:"Sắp xếp",question:"Sắp xếp các bước làm project:",items:["Thiết kế DB & tạo ERD","Tạo project Spring Boot & mapping Entity","Viết Repository → Service → Controller","Cấu hình Security & JWT","Xử lý CORS, Logging, Caching"],answer:[0,1,2,3,4],explanation:"DB → Project → 3-layer → Security → Hoàn thiện."}
        ]
      },
      // --- Testing ---
      {
        id:"p5-testing",title:"Testing: Unit Test & Integration Test",
        lesson:[
          {type:"p",text:"<b>JUnit 5 + Mockito</b> — test Service layer."},
          {type:"p",text:"<b>Các loại test:</b>"},
          {type:"ul",items:[
            "<b>Unit Test</b>: test từng class riêng lẻ (dùng Mockito).",
            "<b>Integration Test</b>: test với Spring context thật.",
            "<b>@WebMvcTest</b>: chỉ load web layer.",
            "<b>@DataJpaTest</b>: chỉ load JPA layer.",
            "<b>@SpringBootTest</b>: load full context."
          ]},
          {type:"code",text:"@ExtendWith(MockitoExtension.class)\nclass UserServiceTest {\n    @Mock\n    private UserRepository userRepo;\n    @Mock\n    private EmailService emailService;\n    \n    @InjectMocks\n    private UserService userService;\n    \n    @Test\n    void shouldCreateUserSuccessfully() {\n        // Arrange\n        var req = new CreateUserRequest(\"Alice\", \"alice@email.com\");\n        var saved = User.builder().id(1L).name(\"Alice\").email(\"alice@email.com\").build();\n        when(userRepo.save(any())).thenReturn(saved);\n        \n        // Act\n        var result = userService.create(req);\n        \n        // Assert\n        assertThat(result.name()).isEqualTo(\"Alice\");\n        verify(userRepo).save(any());\n        verify(emailService).sendWelcome(\"alice@email.com\");\n    }\n}"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Annotation tạo mock trong Mockito?",options:["@Mock","@MockBean","@Spy","@InjectMocks"],answer:0,explanation:"@Mock tạo mock object. @MockBean dùng trong Spring test."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Annotation nào load full Spring context?",options:["@WebMvcTest","@DataJpaTest","@SpringBootTest","@MockitoTest"],answer:2,explanation:"@SpringBootTest load toàn bộ application context."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Method nào xác minh mock đã được gọi?",options:["when()","verify()","assertThat()","mock()"],answer:1,explanation:"verify() kiểm tra mock method đã được gọi với tham số mong đợi."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Inject mock vào đối tượng test: <code>@___</code>",expectedKeywords:["InjectMocks","InjectMocks\n","InjectMocks "],explanation:"@InjectMocks tạo instance và inject các @Mock vào."},
          {type:"truefalse",difficulty:"basic",badge:"Đúng/Sai",question:"@DataJpaTest chỉ load JPA layer, không load web layer?",answer:true,explanation:"@DataJpaTest chỉ load @Entity, @Repository, DataSource — performance tốt hơn."},
          {type:"code",difficulty:"advanced",badge:"Thực hành",question:"Viết unit test cho method findById trả về User khi tìm thấy",template:"@Test\nvoid findById_ShouldReturnUser_WhenFound() {\n    // Arrange\n    \n    // Act\n    \n    // Assert\n}",
          checks:[
            {regex:/when\s*\(/,hint:"Cần mock when() để setup"},
            {regex:/verify|assertThat|assertEquals|assertNotNull/,hint:"Cần verify hoặc assert kết quả"},
            {regex:/@Test/,hint:"Cần @Test annotation"}
          ],explanation:"Mock repository, khi findById trả về Optional.of(user), assert kết quả."}
        ]
      },
      // --- Docker ---
      {
        id:"p5-docker",title:"Docker & Containerization",
        lesson:[
          {type:"p",text:"Docker đóng gói ứng dụng và dependencies vào container — đảm bảo môi trường nhất quán."},
          {type:"code",text:"# Dockerfile cho Spring Boot\nFROM eclipse-temurin:17-jre-alpine\nWORKDIR /app\nCOPY target/*.jar app.jar\nEXPOSE 8080\nENTRYPOINT [\"java\", \"-jar\", \"app.jar\"]"},
          {type:"code",text:"# docker-compose.yml\nversion: '3.8'\nservices:\n  app:\n    build: .\n    ports:\n      - \"8080:8080\"\n    environment:\n      - DATABASE_URL=jdbc:postgresql://db:5432/myapp\n      - JWT_SECRET=${JWT_SECRET}\n    depends_on:\n      - db\n  db:\n    image: postgres:16-alpine\n    environment:\n      POSTGRES_DB: myapp\n      POSTGRES_PASSWORD: ${DB_PASSWORD}\n    volumes:\n      - pgdata:/var/lib/postgresql/data\nvolumes:\n  pgdata:"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Docker image cơ bản cho Spring Boot nên dùng?",options:["openjdk:17","eclipse-temurin:17-jre-alpine","adoptopenjdk:17","java:17"],answer:1,explanation:"eclipse-temurin:17-jre-alpine — nhẹ (alpine), an toàn, phổ biến."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Lệnh build Docker image?",options:["docker build","docker run","docker compose","docker create"],answer:0,explanation:"docker build -t my-app . — build image từ Dockerfile."},
          {type:"fill",difficulty:"basic",badge:"Điền khuyết",question:"Copy JAR vào image: <code>___ target/*.jar app.jar</code>",expectedKeywords:["COPY","COPY ","COPY "],explanation:"COPY instruction copy file từ host vào image."},
          {type:"truefalse",difficulty:"basic",badge:"Đúng/Sai",question:"docker-compose dùng để chạy nhiều container cùng lúc?",answer:true,explanation:"Docker Compose quản lý multi-container ứng dụng (app + database + redis...)."}
        ]
      },
      // --- Actuator ---
      {
        id:"p5-actuator",title:"Monitoring với Actuator",
        lesson:[
          {type:"p",text:"Spring Boot Actuator cung cấp endpoints giám sát và quản lý ứng dụng."},
          {type:"ul",items:[
            "<code>/actuator/health</code> — kiểm tra ứng dụng sống/ chết.",
            "<code>/actuator/info</code> — thông tin ứng dụng.",
            "<code>/actuator/metrics</code> — metrics (memory, CPU, ...).",
            "<code>/actuator/loggers</code> — xem/thay đổi log level runtime.",
            "<code>/actuator/env</code> — xem environment properties."
          ]},
          {type:"code",text:"# application.yml\nmanagement:\n  endpoints:\n    web:\n      exposure:\n        include: health,info,metrics,loggers\n  endpoint:\n    health:\n      show-details: always\n    \ninfo:\n  app:\n    name: ${spring.application.name}\n    version: @project.version@\n    java: ${java.version}"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Actuator endpoint kiểm tra ứng dụng sống?",options:["/actuator/info","/actuator/health","/actuator/ping","/actuator/status"],answer:1,explanation:"/actuator/health trả về UP/DOWN status."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Config expose tất cả actuator endpoints?",options:["include: *","include: all","include: '*'","expose: all"],answer:2,explanation:"include: '*' expose tất cả endpoints (⚠️ chỉ dùng trong dev)."},
          {type:"fill",difficulty:"basic",badge:"Điền khuyết",question:"Dependency cho Actuator: <code>spring-boot-starter-___</code>",expectedKeywords:["actuator","actuator\n"],explanation:"spring-boot-starter-actuator thêm Actuator vào project."},
          {type:"truefalse",difficulty:"intermediate",badge:"Đúng/Sai",question:"Actuator có thể thay đổi log level runtime?",answer:true,explanation:"POST /actuator/loggers/{package} với body {\"configuredLevel\": \"DEBUG\"}."}
        ]
      },
      // --- Swagger & Deploy ---
      {
        id:"p5-swagger",title:"Swagger/OpenAPI & Deployment",
        lesson:[
          {type:"p",text:"<b>SpringDoc OpenAPI</b> — tự động tạo tài liệu API."},
          {type:"code",text:"<!-- Maven dependency -->\n<dependency>\n    <groupId>org.springdoc</groupId>\n    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>\n    <version>2.3.0</version>\n</dependency>\n\n// Sau đó truy cập:\n// http://localhost:8080/swagger-ui.html\n// http://localhost:8080/v3/api-docs"},
          {type:"p",text:"<b>Deployment lên Railway/Render:</b>"},
          {type:"ol",items:[
            "Thêm <code>spring-boot-maven-plugin</code>.",
            "Port: <code>server.port=${PORT:8080}</code>.",
            "Push code lên GitHub.",
            "Kết nối GitHub với Railway/Render.",
            "Cấu hình biến môi trường (DATABASE_URL, JWT_SECRET).",
            "Railway tự động build: <code>mvn clean package</code>."
          ]},
          {type:"code",text:"# application-production.yml\nserver:\n  port: ${PORT:8080}\n\nspring:\n  datasource:\n    url: ${DATABASE_URL}\n    driver-class-name: org.postgresql.Driver\n  jpa:\n    hibernate:\n      ddl-auto: validate\n      \napp:\n  jwt:\n    secret: ${JWT_SECRET}\n    expiration: 86400000"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"SpringDoc OpenAPI UI endpoint mặc định?",options:["/api/docs","/swagger-ui.html","/openapi","/docs"],answer:1,explanation:"http://localhost:8080/swagger-ui.html"},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Môi trường production nên dùng database nào?",options:["H2","PostgreSQL","MySQL","SQLite"],answer:1,explanation:"PostgreSQL — production-ready, Railway/Render support tốt."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Spring Boot plugin cho Maven build?",options:["maven-jar-plugin","spring-boot-maven-plugin","maven-compiler-plugin","exec-maven-plugin"],answer:1,explanation:"spring-boot-maven-plugin tạo fat JAR có thể chạy bằng java -jar."},
          {type:"fill",difficulty:"basic",badge:"Điền khuyết",question:"Chạy Spring Boot JAR: <code>java -jar ___.jar</code>",expectedKeywords:["app","target/app","myapp","application"],explanation:"java -jar target/app.jar (hoặc tên JAR sau khi build)."},
          {type:"truefalse",difficulty:"intermediate",badge:"Đúng/Sai",question:"Railway hỗ trợ auto-deploy từ GitHub?",answer:true,explanation:"Railway tự động build và deploy khi push lên GitHub branch chính."}
        ]
      }
    ]
  },

  // ============================================================
  // PHASE 6: MICROSERVICES & SPRING CLOUD
  // ============================================================
  {
    id:"phase-6",title:"Microservices & Spring Cloud",icon:"🌐",
    desc:"Monolithic vs Microservices, Spring Cloud Gateway, Eureka, gRPC",
    topics:[
      // --- Monolithic vs Microservices ---
      {
        id:"p6-intro",title:"Monolithic vs Microservices",
        sources:[
          {name:"Spring.io — Microservices Guide",url:"https://spring.io/microservices"},
          {name:"Baeldung — Introduction to Microservices",url:"https://www.baeldung.com/spring-microservices-introduction"},
          {name:"Martin Fowler — Microservices",url:"https://martinfowler.com/articles/microservices.html"},
          {name:"Microsoft — Microservices Architecture",url:"https://learn.microsoft.com/en-us/azure/architecture/microservices/"}
        ],
        lesson:[
          {type:"p",text:"<b>Monolithic Architecture</b>: Toàn bộ ứng dụng là một khối duy nhất — một codebase, một deployment."},
          {type:"ul",items:[
            "✅ Đơn giản khi phát triển, dễ test, dễ deploy lúc đầu.",
            "❌ Khó maintain khi lớn, một lỗi ảnh hưởng toàn hệ thống, scaling bất tiện.",
            "❌ Công nghệ cứng nhắc — buộc dùng một stack."
          ]},
          {type:"p",text:"<b>Microservices Architecture</b>: Chia ứng dụng thành nhiều service nhỏ, độc lập, mỗi service làm một việc."},
          {type:"ul",items:[
            "✅ Mỗi service deploy độc lập, scale độc lập, dễ bảo trì.",
            "✅ Có thể dùng công nghệ khác nhau cho từng service.",
            "❌ Phức tạp hơn: cần quản lý giao tiếp giữa các service, distributed transactions, monitoring.",
            "❌ Cần giải quyết vấn đề: service discovery, API gateway, logging tập trung."
          ]},
          {type:"code",text:"// Ví dụ: Monolithic E-commerce\n// Một ứng dụng chứa tất cả:\n// - src/main/java/com/shop/\n//   ├── controller/OrderController.java\n//   ├── controller/ProductController.java\n//   ├── controller/UserController.java\n//   ├── service/OrderService.java\n//   ├── service/ProductService.java\n//   └── ...\n\n// Microservices: Mỗi service là một ứng dụng riêng\n// order-service/\n//   └── src/main/java/com/order/\n// product-service/\n//   └── src/main/java/com/product/\n// user-service/\n//   └── src/main/java/com/user/" },
          {type:"p",text:"💡 <b>Khi nào dùng Microservices?</b> Khi ứng dụng lớn, team nhiều người, cần scale từng phần riêng."}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Kiến trúc nào có một codebase duy nhất, deploy một lần?",options:["Microservices","Monolithic","SOA","Serverless"],answer:1,explanation:"Monolithic: một khối duy nhất, deploy cùng lúc."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Lợi ích chính của Microservices?",options:["Dễ code hơn","Deploy độc lập, scale độc lập","Ít service hơn","Không cần database"],answer:1,explanation:"Mỗi microservice deploy & scale độc lập, dễ bảo trì."},
          {type:"mcq",difficulty:"intermediate",badge:"Lý thuyết",question:"Thách thức lớn nhất của Microservices?",options:["Viết code lâu hơn","Quản lý giao tiếp giữa các service","Tốn nhiều RAM","Không dùng được Java"],answer:1,explanation:"Giao tiếp giữa services (REST/gRPC/message queue), distributed transactions, monitoring là thách thức."},
          {type:"truefalse",difficulty:"basic",badge:"Đúng/Sai",question:"Trong microservices, mỗi service có thể dùng công nghệ khác nhau?",answer:true,explanation:"Đúng! Service A dùng Java, Service B dùng Python, giao tiếp qua API."},
          {type:"order",difficulty:"intermediate",badge:"Sắp xếp",question:"Sắp xếp quy trình chuyển từ Monolithic sang Microservices:",items:["Xác định bounded context (DDD)","Tách service theo business domain","Thiết lập API gateway","Cấu hình service discovery","Triển khai từng service độc lập"],answer:[0,1,2,3,4],explanation:"Phân tích domain → Tách service → API gateway → Service discovery → Deploy."}
        ]
      },
      // --- Spring Cloud Gateway ---
      {
        id:"p6-gateway",title:"Spring Cloud Gateway",
        sources:[
          {name:"Spring.io — Gateway Docs",url:"https://docs.spring.io/spring-cloud-gateway/reference/"},
          {name:"Baeldung — Spring Cloud Gateway Guide",url:"https://www.baeldung.com/spring-cloud-gateway"},
          {name:"Baeldung — Routes, Predicates, Filters",url:"https://www.baeldung.com/spring-cloud-gateway-routes-predicates-filters"}
        ],
        lesson:[
          {type:"p",text:"<b>API Gateway</b> — entry điểm duy nhất cho tất cả request vào hệ thống microservices."},
          {type:"p",text:"Spring Cloud Gateway là API Gateway xây trên Spring WebFlux (reactive)."},
          {type:"ul",items:[
            "Routing: định tuyến request đến service phù hợp.",
            "Filter: thêm logic xử lý trước/sau khi route ( authentication, logging, rate limiting).",
            "Load balancing: phân phối request giữa các instance của service.",
            "Tích hợp với Eureka để service discovery."
          ]},
          {type:"code",text:"# application.yml — Spring Cloud Gateway\nspring:\n  cloud:\n    gateway:\n      routes:\n        - id: user-service\n          uri: lb://user-service\n          predicates:\n            - Path=/api/users/**\n          filters:\n            - StripPrefix=1\n            - name: CircuitBreaker\n              args:\n                name: userService\n                fallbackUri: forward:/fallback/users\n\n        - id: order-service\n          uri: lb://order-service\n          predicates:\n            - Path=/api/orders/**\n          filters:\n            - StripPrefix=1"},
          {type:"code",text:"// Gateway main class\n@SpringBootApplication\n@EnableDiscoveryClient\npublic class GatewayApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(GatewayApplication.class, args);\n    }\n}"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Spring Cloud Gateway dùng reactive framework nào?",options:["Spring MVC","Spring WebFlux","Spring WebSocket","Spring Security"],answer:1,explanation:"Spring Cloud Gateway xây dựng trên Spring WebFlux (Project Reactor)."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Annotation đánh dấu service đăng ký với Eureka?",options:["@EnableEurekaClient","@EnableDiscoveryClient","@EnableFeignClients","@EnableGateway"],answer:1,explanation:"@EnableDiscoveryClient đăng ký service vào service registry (Eureka)."},
          {type:"fill",difficulty:"basic",badge:"Điền khuyết",question:"URI load balancing format: <code>___://service-name</code>",expectedKeywords:["lb","lb\n"],explanation:"lb://service-name — load balancing bằng LoadBalancerClient."},
          {type:"truefalse",difficulty:"basic",badge:"Đúng/Sai",question:"API Gateway là single point of failure?",answer:true,explanation:"Đúng — cần deploy nhiều instance gateway để tránh SPOF."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Spring Cloud Gateway dùng ___ để route request đến service.",expectedKeywords:["predicates","predicates\n","Predicate"],explanation:"Predicates là điều kiện để route request (vd: Path, Method, Header)."}
        ]
      },
      // --- Service Discovery & Feign ---
      {
        id:"p6-discovery",title:"Service Discovery & Feign Client",
        sources:[
          {name:"Spring.io — Service Discovery",url:"https://spring.io/microservices/service-discovery"},
          {name:"Baeldung — Feign Client Guide",url:"https://www.baeldung.com/spring-cloud-openfeign"},
          {name:"Baeldung — Eureka Server and Client",url:"https://www.baeldung.com/spring-cloud-netflix-eureka"}
        ],
        lesson:[
          {type:"p",text:"<b>Service Discovery</b>: Các service tự động tìm và gọi nhau mà không cần hard-code URL."},
          {type:"p",text:"<b>Netflix Eureka</b> — service registry phổ biến:"},
          {type:"ul",items:[
            "Eureka Server: nhận đăng ký từ các service.",
            "Eureka Client: đăng ký khi start, gửi heartbeat để duy trì.",
            "Mỗi service có một tên duy nhất (spring.application.name).",
            "Các service gọi nhau qua tên, không qua IP/port."
          ]},
          {type:"code",text:"# Eureka Server application.yml\nserver:\n  port: 8761\neureka:\n  client:\n    register-with-eureka: false\n    fetch-registry: false\n\n# Eureka Client (user-service)\nspring:\n  application:\n    name: user-service\neureka:\n  client:\n    service-url:\n      defaultZone: http://localhost:8761/eureka/"},
          {type:"p",text:"<b>OpenFeign</b> — declarative HTTP client cho microservices:"},
          {type:"code",text:"// Feign Client — gọi service khác như gọi local method\n@FeignClient(name = \"user-service\")\npublic interface UserClient {\n    \n    @GetMapping(\"/api/users/{id}\")\n    UserResponse getUserById(@PathVariable Long id);\n    \n    @PostMapping(\"/api/users\")\n    UserResponse createUser(@RequestBody CreateUserRequest req);\n}\n\n// Sử dụng trong service\n@Service\npublic class OrderService {\n    private final UserClient userClient;\n    \n    public Order createOrder(CreateOrderRequest req) {\n        UserResponse user = userClient.getUserById(req.userId());\n        // ... xử lý\n    }\n}"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Eureka Server port mặc định?",options:["8080","8761","9090","443"],answer:1,explanation:"Eureka Server mặc định chạy port 8761."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Feign là gì?",options:["API Gateway","Declarative HTTP client","Message Queue","Database"],answer:1,explanation:"OpenFeign — khai báo interface, tự động tạo HTTP client gọi service khác."},
          {type:"mcq",difficulty:"intermediate",badge:"Lý thuyết",question:"Annotation FeignClient dùng tham số nào để định danh service?",options:["url","name","value","path"],answer:1,explanation:"name = \"service-name\" tương ứng với spring.application.name của service đích."},
          {type:"fill",difficulty:"basic",badge:"Điền khuyết",question:"Eureka Client gửi ___ định kỳ để duy trì đăng ký.",expectedKeywords:["heartbeat","heartbeat\n","Heartbeat"],explanation:"Heartbeat gửi mỗi 30s để thông báo service còn sống."},
          {type:"truefalse",difficulty:"intermediate",badge:"Đúng/Sai",question:"Feign tự động tích hợp với Eureka để load balancing?",answer:true,explanation:"Feign + Eureka tự động load balancing qua tên service."},
          {type:"code",difficulty:"advanced",badge:"Thực hành",question:"Viết FeignClient gọi product-service lấy thông tin sản phẩm theo ID",template:"// FeignClient gọi product-service\n@FeignClient(name = \"product-service\")\npublic interface ProductClient {\n    \n    // GET /api/products/{id}\n}",
          checks:[
            {regex:/@FeignClient/,hint:"Cần @FeignClient annotation"},
            {regex:/@GetMapping/,hint:"Cần @GetMapping cho phương thức"},
            {regex:/@PathVariable/,hint:"Cần @PathVariable Long id"}
          ],explanation:"@FeignClient(name = \"product-service\") + @GetMapping + @PathVariable."}
        ]
      },
      // --- Circuit Breaker & Resilience ---
      {
        id:"p6-resilience",title:"Circuit Breaker & Resilience4j",
        sources:[
          {name:"Resilience4j — Official Docs",url:"https://resilience4j.readme.io/docs"},
          {name:"Baeldung — Circuit Breaker Guide",url:"https://www.baeldung.com/spring-cloud-circuit-breaker"},
          {name:"Martin Fowler — Circuit Breaker",url:"https://martinfowler.com/bliki/CircuitBreaker.html"}
        ],
        lesson:[
          {type:"p",text:"<b>Circuit Breaker</b> pattern — ngăn lỗi lan rộng trong hệ thống microservices."},
          {type:"ul",items:[
            "3 trạng thái: <b>CLOSED</b> (bình thường) → <b>OPEN</b> (lỗi nhiều) → <b>HALF_OPEN</b> (thử lại).",
            "Khi một service gọi service khác bị lỗi, circuit breaker mở → request fail nhanh thay vì chờ timeout.",
            "Sau thời gian chờ, chuyển HALF_OPEN → thử request → thành công thì CLOSED, thất bại thì OPEN."
          ]},
          {type:"p",text:"<b>Resilience4j</b> — thư viện fault tolerance cho Spring Boot:"},
          {type:"ul",items:[
            "<code>@CircuitBreaker(name = \"userService\")</code> — bảo vệ gọi service.",
            "<code>@Retry(name = \"userService\")</code> — tự động retry khi lỗi.",
            "<code>@RateLimiter(name = \"userService\")</code> — giới hạn số request.",
            "<code>@TimeLimiter(name = \"userService\")</code> — timeout."
          ]},
          {type:"code",text:"@Service\npublic class OrderService {\n    \n    @CircuitBreaker(name = \"inventoryService\", fallbackMethod = \"fallbackInventory\")\n    public boolean checkInventory(Long productId, int qty) {\n        return inventoryClient.checkStock(productId, qty);\n    }\n    \n    // Fallback — chạy khi circuit breaker OPEN hoặc exception\n    public boolean fallbackInventory(Long productId, int qty, Throwable t) {\n        log.warn(\"Inventory service unavailable, using fallback\");\n        return false; // Coi như không đủ hàng\n    }\n}"},
          {type:"code",text:"# application.yml\nresilience4j:\n  circuitbreaker:\n    configs:\n      default:\n        sliding-window-size: 10\n        failure-rate-threshold: 50\n        wait-duration-in-open-state: 10s\n        permitted-number-of-calls-in-half-open-state: 3\n  retry:\n    configs:\n      default:\n        max-attempts: 3\n        wait-duration: 1s"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Circuit Breaker trạng thái nào cho phép request đi qua bình thường?",options:["OPEN","CLOSED","HALF_OPEN","DISABLED"],answer:1,explanation:"CLOSED — mạch đóng, request đi qua bình thường."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Annotation của Resilience4j cho retry?",options:["@CircuitBreaker","@Retry","@RateLimiter","@Bulkhead"],answer:1,explanation:"@Retry tự động gọi lại method khi thất bại."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Fallback method phải có tham số cuối là ___",expectedKeywords:["Throwable","Throwable t","Throwable","Exception"],explanation:"Fallback method nhận exception làm tham số cuối để xử lý."},
          {type:"truefalse",difficulty:"intermediate",badge:"Đúng/Sai",question:"Circuit Breaker chỉ áp dụng cho HTTP calls?",answer:false,explanation:"Circuit Breaker áp dụng cho bất kỳ loại call nào (HTTP, database, message queue...)."}
        ]
      }
    ]
  },

  // ============================================================
  // PHASE 7: EVENT-DRIVEN ARCHITECTURE
  // ============================================================
  {
    id:"phase-7",title:"Event-Driven Architecture",icon:"⚡",
    desc:"EDA, Kafka, Event Sourcing, CQRS, Saga Pattern, Schema Registry",
    topics:[
      // --- EDA Concepts ---
      {
        id:"p7-eda",title:"Event-Driven Architecture Concepts",
        sources:[
          {name:"Confluent — Event-Driven Architecture Guide",url:"https://www.confluent.io/learn/event-driven-architecture/"},
          {name:"Martin Fowler — Events",url:"https://martinfowler.com/articles/201503-event-driven.html"},
          {name:"AWS — What is Event-Driven Architecture?",url:"https://aws.amazon.com/event-driven-architecture/"}
        ],
        lesson:[
          {type:"p",text:"<b>Event-Driven Architecture (EDA)</b> — các service giao tiếp bất đồng bộ qua events, thay vì gọi synchronous request/response."},
          {type:"p",text:"<b>Event vs Message vs Command:</b>"},
          {type:"ul",items:[
            "<b>Command</b>: yêu cầu xử lý, mong đợi kết quả — VD: <code>CreateOrder</code>",
            "<b>Event</b>: thông báo một việc đã xảy ra, không mong đợi response — VD: <code>OrderCreated</code>",
            "<b>Message</b>: dữ liệu đóng gói command/event để gửi qua message broker."
          ]},
          {type:"p",text:"<b>EDA Flow điển hình:</b>"},
          {type:"code",text:"// EDA Flow: Xử lý đơn hàng\n// 1. User click \"Place Order\" → Command\n// 2. OrderService xử lý, emit event\n// 3. Event gửi qua Message Broker (Kafka)\n// 4. Các service subscribe phản ứng:\n//    - EmailService: gửi email xác nhận\n//    - InventoryService: trừ kho\n//    - ShippingService: tạo đơn vận chuyển\n//    - AnalyticsService: ghi log thống kê"},
          {type:"p",text:"💡 <b>Lợi ích:</b> Loose coupling, dễ mở rộng, mỗi service độc lập. <b>Thách thức:</b> eventual consistency, khó debug."}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Event khác Command ở điểm nào?",options:["Event nhanh hơn","Event không mong đợi response","Command không có dữ liệu","Event chỉ dùng cho Kafka"],answer:1,explanation:"Event thông báo việc đã xảy ra, không mong đợi phản hồi. Command mong đợi kết quả."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"EDA giúp các service ___ với nhau?",options:["Liên kết chặt","Liên kết lỏng (loosely coupled)","Không giao tiếp","Giao tiếp đồng bộ"],answer:1,explanation:"EDA: service giao tiếp qua events bất đồng bộ → loose coupling."},
          {type:"fill",difficulty:"basic",badge:"Điền khuyết",question:"EDA viết tắt của: Event-___ Architecture",expectedKeywords:["Driven","Driven\n"],explanation:"Event-Driven Architecture."},
          {type:"truefalse",difficulty:"intermediate",badge:"Đúng/Sai",question:"EDA luôn đảm bảo tính nhất quán tức thời (strong consistency)?",answer:false,explanation:"EDA thường dùng eventual consistency — dữ liệu có độ trễ mới đồng bộ."}
        ]
      },
      // --- Apache Kafka ---
      {
        id:"p7-kafka",title:"Apache Kafka",
        sources:[
          {name:"Apache Kafka — Official Docs",url:"https://kafka.apache.org/documentation/"},
          {name:"Baeldung — Spring Kafka Guide",url:"https://www.baeldung.com/spring-kafka"},
          {name:"Confluent — Kafka Tutorials",url:"https://developer.confluent.io/tutorials/"}
        ],
        lesson:[
          {type:"p",text:"Apache Kafka là nền tảng streaming phân tán — xương sống của EDA trong microservices."},
          {type:"p",text:"<b>Kiến trúc Kafka:</b>"},
          {type:"ul",items:[
            "<b>Producer</b>: gửi dữ liệu vào topic.",
            "<b>Consumer</b>: đọc dữ liệu từ topic.",
            "<b>Broker</b>: node lưu trữ và chuyển tiếp message.",
            "<b>Topic</b>: kênh phân loại message.",
            "<b>Partition</b>: topic chia thành partition để xử lý song song.",
            "<b>Offset</b>: vị trí đọc của consumer trong partition."
          ]},
          {type:"p",text:"<b>Consumer Group:</b> Mỗi partition chỉ do một consumer trong group đọc."},
          {type:"code",text:"# Kafka trong docker-compose\nversion: '3.8'\nservices:\n  zookeeper:\n    image: confluentinc/cp-zookeeper:latest\n    environment:\n      ZOOKEEPER_CLIENT_PORT: 2181\n  kafka:\n    image: confluentinc/cp-kafka:latest\n    depends_on: [zookeeper]\n    ports:\n      - \"9092:9092\"\n    environment:\n      KAFKA_BROKER_ID: 1\n      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181\n      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092"},
          {type:"code",text:"// Spring Kafka — Producer\n@Service\npublic class OrderEventProducer {\n    \n    @Autowired\n    private KafkaTemplate<String, OrderEvent> kafkaTemplate;\n    \n    public void orderCreated(OrderEvent event) {\n        kafkaTemplate.send(\"order-events\", event.orderId(), event);\n    }\n}\n\n// Spring Kafka — Consumer\n@Component\npublic class EmailNotificationConsumer {\n    \n    @KafkaListener(topics = \"order-events\", groupId = \"email-group\")\n    public void handleOrderEvent(OrderEvent event) {\n        log.info(\"Received order event: {}\", event);\n        emailService.sendOrderConfirmation(event);\n    }\n}"}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Thành phần nào trong Kafka lưu message?",options:["Producer","Consumer","Broker","Zookeeper"],answer:2,explanation:"Broker lưu và chuyển tiếp message giữa producer và consumer."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Kafka đảm bảo thứ tự message trong phạm vi nào?",options:["Toàn bộ topic","Một partition","Một consumer group","Toàn bộ cluster"],answer:1,explanation:"Kafka chỉ đảm bảo thứ tự trong một partition."},
          {type:"mcq",difficulty:"intermediate",badge:"Lý thuyết",question:"Spring annotation cho Kafka consumer?",options:["@KafkaConsumer","@KafkaListener","@ListenToKafka","@MessageListener"],answer:1,explanation:"@KafkaListener(topics = \"...\", groupId = \"...\") listen Kafka topic."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Gửi message với key để đảm bảo cùng partition: <code>kafkaTemplate.send(topic, ___ , value)</code>",expectedKeywords:["key","key\n","event.orderId()"],explanation:"Key quyết định partition — cùng key = cùng partition = cùng thứ tự."},
          {type:"truefalse",difficulty:"intermediate",badge:"Đúng/Sai",question:"Kafka đảm bảo exactly-once delivery từ version 2.0?",answer:true,explanation:"Kafka 2.0+ hỗ trợ exactly-once semantics (EOS) qua idempotent producer + transactional API."},
          {type:"order",difficulty:"advanced",badge:"Sắp xếp",question:"Sắp xếp Kafka message flow:",items:["Producer gửi message đến topic","Broker lưu message vào partition","Consumer subscribe topic","Consumer đọc message theo offset","Consumer xử lý message"],answer:[0,1,2,3,4],explanation:"Producer → Broker → Consumer subscribe → Consumer poll (offset) → Process."}
        ]
      },
      // --- Event Sourcing ---
      {
        id:"p7-sourcing",title:"Event Sourcing",
        sources:[
          {name:"Martin Fowler — Event Sourcing",url:"https://martinfowler.com/eaaDev/EventSourcing.html"},
          {name:"Microsoft — Event Sourcing Pattern",url:"https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing"},
          {name:"Confluent — Event Sourcing vs CQRS",url:"https://www.confluent.io/blog/event-sourcing-vs-cqrs/"}
        ],
        lesson:[
          {type:"p",text:"<b>Event Sourcing</b>: Lưu toàn bộ lịch sử thay đổi trạng thái dưới dạng các event, thay vì chỉ lưu trạng thái hiện tại."},
          {type:"p",text:"<b>Khác biệt:</b>"},
          {type:"ul",items:[
            "Traditional: quantity = 2 (ghi đè giá trị cũ).",
            "Event Sourcing: <code>ItemAdded qty=1</code>, <code>ItemAdded qty=1</code>, <code>ItemRemoved qty=1</code>.",
            "Trạng thái hiện tại = replay tất cả event từ đầu."
          ]},
          {type:"code",text:"// Event Sourcing — ví dụ Order Aggregate\npublic class OrderAggregate {\n    private String orderId;\n    private List<OrderEvent> changes = new ArrayList<>();\n    \n    public void createOrder(String customerId, List<OrderItem> items) {\n        applyEvent(new OrderCreatedEvent(orderId, customerId, items));\n    }\n    \n    public void addItem(OrderItem item) {\n        applyEvent(new ItemAddedEvent(orderId, item));\n    }\n    \n    private void applyEvent(OrderEvent event) {\n        changes.add(event);\n        // Cập nhật state dựa trên event\n        when(event);\n    }\n    \n    private void when(OrderCreatedEvent e) {\n        this.customerId = e.customerId();\n        this.items = new ArrayList<>(e.items());\n        this.status = OrderStatus.CREATED;\n    }\n    \n    // Lưu events vào event store\n    public void save(EventStore eventStore) {\n        eventStore.save(orderId, changes);\n    }\n}"},
          {type:"p",text:"💡 <b>Lợi ích:</b> Audit trail đầy đủ, rollback/undo dễ dàng, phân tích lịch sử."}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Event Sourcing lưu gì thay vì lưu trạng thái hiện tại?",options:["Chỉ log lỗi","Toàn bộ lịch sử thay đổi dạng events","Cache dữ liệu","Snapshot database"],answer:1,explanation:"Event Sourcing lưu chuỗi events — mỗi event là một thay đổi trạng thái."},
          {type:"mcq",difficulty:"intermediate",badge:"Lý thuyết",question:"Làm thế nào để biết trạng thái hiện tại trong Event Sourcing?",options:["Đọc từ database","Replay tất cả events","Gọi API khác","Dùng cache"],answer:1,explanation:"Replay tất cả events từ đầu → tính toán trạng thái hiện tại."},
          {type:"fill",difficulty:"basic",badge:"Điền khuyết",question:"Khi nào dùng Event Sourcing? Khi cần ___ trail đầy đủ.",expectedKeywords:["audit","audit\n","Audit"],explanation:"Event Sourcing cung cấp audit trail đầy đủ — mọi thay đổi đều được ghi lại."},
          {type:"truefalse",difficulty:"intermediate",badge:"Đúng/Sai",question:"Event Sourcing có thể rollback đến bất kỳ thời điểm nào?",answer:true,explanation:"Đúng — chỉ cần replay events đến thời điểm mong muốn."}
        ]
      },
      // --- CQRS ---
      {
        id:"p7-cqrs",title:"CQRS Pattern",
        sources:[
          {name:"Martin Fowler — CQRS",url:"https://martinfowler.com/bliki/CQRS.html"},
          {name:"Microsoft — CQRS Pattern",url:"https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs"},
          {name:"Baeldung — CQRS Event Sourcing",url:"https://www.baeldung.com/cqrs-event-sourcing-java"}
        ],
        lesson:[
          {type:"p",text:"<b>CQRS (Command Query Responsibility Segregation)</b> — tách riêng write model (Command) và read model (Query)."},
          {type:"ul",items:[
            "<b>Command Model</b>: xử lý ghi (create, update, delete) — phức tạp, cần validate.",
            "<b>Query Model</b>: xử lý đọc — đơn giản, tối ưu cho hiệu năng.",
            "Mỗi model có thể scale riêng, dùng database riêng.",
            "Thường kết hợp với Event Sourcing: events → cập nhật read model."
          ]},
          {type:"code",text:"// CQRS Example\nexport class OrdersModule {}\n\n// Command (Write)\n@RestController\n@RequestMapping(\"/api/commands/orders\")\npublic class OrderCommandController {\n    @PostMapping\n    public CompletableFuture<Void> createOrder(@RequestBody CreateOrderCommand cmd) {\n        return commandBus.dispatch(cmd);\n    }\n}\n\n// Query (Read)\n@RestController\n@RequestMapping(\"/api/queries/orders\")\npublic class OrderQueryController {\n    @GetMapping(\"/{id}\")\n    public OrderReadModel getOrder(@PathVariable String id) {\n        return orderReadRepository.findById(id);\n    }\n    \n    @GetMapping\n    public List<OrderSummary> getOrdersByCustomer(@RequestParam String customerId) {\n        return orderReadRepository.findByCustomerId(customerId);\n    }\n}"},
          {type:"p",text:"💡 <b>Khi nào dùng CQRS?</b> Khi ứng dụng có tần suất đọc/ghi chênh lệch lớn, hoặc write-side có business logic phức tạp."}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"CQRS tách riêng 2 model nào?",options:["Controller và Service","Command và Query","Entity và DTO","Sync và Async"],answer:1,explanation:"CQRS = Command (write) + Query (read) riêng biệt."},
          {type:"mcq",difficulty:"intermediate",badge:"Lý thuyết",question:"CQRS thường kết hợp với pattern nào?",options:["Singleton","Factory","Event Sourcing","Proxy"],answer:2,explanation:"CQRS + Event Sourcing: events từ write model cập nhật read model."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Read model có thể scale ___ so với write model.",expectedKeywords:["riêng","độc lập","khác"],explanation:"Read và write model scale độc lập — read có thể nhiều instance hơn."},
          {type:"truefalse",difficulty:"basic",badge:"Đúng/Sai",question:"Trong CQRS, read model luôn consistent ngay với write model?",answer:false,explanation:"CQRS thường dùng eventual consistency — read model cập nhật sau write."}
        ]
      },
      // --- Saga Pattern ---
      {
        id:"p7-saga",title:"Saga Pattern",
        sources:[
          {name:"Microservices.io — Saga",url:"https://microservices.io/patterns/data/saga.html"},
          {name:"Baeldung — Saga Pattern Guide",url:"https://www.baeldung.com/spring-microservices-saga"},
          {name:"Confluent — Saga Pattern",url:"https://www.confluent.io/blog/event-sourcing-cqrs-microservices-saga-patterns/"}
        ],
        lesson:[
          {type:"p",text:"<b>Saga Pattern</b> — quản lý distributed transaction trong microservices, thay thế 2PC (Two-Phase Commit)."},
          {type:"p",text:"Mỗi saga là một chuỗi local transactions, mỗi bước có <b>compensating action</b> để rollback."},
          {type:"p",text:"<b>2 loại Saga:</b>"},
          {type:"ul",items:[
            "<b>Choreography-based</b>: các service giao tiếp qua events, không có central coordinator. Mỗi service lắng nghe event và quyết định hành động tiếp theo.",
            "<b>Orchestration-based</b>: có một <b>Saga Orchestrator</b> trung tâm điều khiển thứ tự, xử lý lỗi tập trung."
          ]},
          {type:"code",text:"// Saga Orchestrator Example\n@Component\npublic class OrderSagaOrchestrator {\n    \n    @Saga\n    public void processOrder(CreateOrderCommand cmd) {\n        try {\n            // Bước 1: Tạo order\n            orderService.createOrder(cmd);\n            \n            // Bước 2: Xử lý payment\n            paymentService.processPayment(cmd.paymentInfo());\n            \n            // Bước 3: Kiểm tra inventory\n            inventoryService.reserveStock(cmd.items());\n            \n            // Bước 4: Gửi email xác nhận\n            notificationService.sendConfirmation(cmd.email());\n            \n        } catch (PaymentFailedException e) {\n            // Compensation: hủy order\n            orderService.cancelOrder(cmd.orderId());\n        } catch (InventoryException e) {\n            // Compensation: refund payment + hủy order\n            paymentService.refund(cmd.paymentInfo());\n            orderService.cancelOrder(cmd.orderId());\n        }\n    }\n}"},
          {type:"p",text:"💡 <b>Choreography vs Orchestration:</b> Choreography đơn giản hơn nhưng khó quản lý khi nhiều service. Orchestration tập trung hơn, dễ monitor."}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Saga pattern quản lý gì?",options:["API Gateway","Distributed transaction","Load balancing","Service discovery"],answer:1,explanation:"Saga quản lý distributed transaction — chia thành nhiều local transactions + compensating actions."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Saga nào dùng central coordinator?",options:["Choreography","Orchestration","Event Sourcing","CQRS"],answer:1,explanation:"Orchestration-based Saga có Saga Orchestrator điều khiển tập trung."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Hành động rollback trong Saga gọi là ___ action.",expectedKeywords:["compensating","compensating\n","compensation"],explanation:"Compensating action — đảo ngược tác động của local transaction khi có lỗi."},
          {type:"truefalse",difficulty:"basic",badge:"Đúng/Sai",question:"Saga pattern dùng 2PC (Two-Phase Commit)?",answer:false,explanation:"Saga là alternative cho 2PC. 2PC dùng locks, Saga dùng compensating actions."},
          {type:"order",difficulty:"advanced",badge:"Sắp xếp",question:"Sắp xếp Saga Orchestration cho order processing:",items:["Tạo order","Xử lý payment","Kiểm tra inventory","Gửi email xác nhận"],answer:[0,1,2,3],explanation:"Create → Payment → Inventory → Notification."}
        ]
      },
      // --- Schema Registry & Message Design ---
      {
        id:"p7-schema",title:"Schema Registry & Message Design",
        sources:[
          {name:"Confluent — Schema Registry Docs",url:"https://docs.confluent.io/platform/current/schema-registry/index.html"},
          {name:"Baeldung — Avro Schema Registry",url:"https://www.baeldung.com/spring-cloud-stream-schema-registry"},
          {name:"Avro — Official Docs",url:"https://avro.apache.org/docs/"}
        ],
        lesson:[
          {type:"p",text:"Khi message schema thay đổi (thêm field), consumer cũ không đọc được message mới."},
          {type:"p",text:"<b>Schema Registry</b> — central service quản lý schema versions:"},
          {type:"ul",items:[
            "Lưu schema versions theo topic.",
            "Kiểm tra compatibility khi schema thay đổi.",
            "Consumer lấy schema để decode message chính xác.",
            "Thường dùng với Avro format (Confluent Schema Registry)."
          ]},
          {type:"p",text:"<b>Compatibility Strategies:</b>"},
          {type:"ul",items:[
            "<b>Backward compatible</b>: consumer cũ đọc được message mới (thêm field optional).",
            "<b>Forward compatible</b>: consumer mới đọc được message cũ (bỏ field).",
            "<b>Full compatibility</b>: cả 2 chiều."
          ]},
          {type:"code",text:"// Schema evolution example\n// V1 schema (old)\n{\n    \"orderId\": \"123\",\n    \"amount\": 100\n}\n\n// V2 schema (new) — backward compatible\n{\n    \"orderId\": \"123\",\n    \"amount\": 100,\n    \"currency\": \"USD\"  // field mới, optional\n}\n\n// In-place versioning\n{\n    \"version\": \"v2\",\n    \"orderId\": \"123\",\n    \"amount\": 100,\n    \"currency\": \"USD\"\n}"},
          {type:"p",text:"<b>Partitioning Strategies:</b> Random (throughput), Key-based (giữ thứ tự theo key), Custom."}
        ],
        exercises:[
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Schema Registry quản lý gì?",options:["Database schema","Message schema versions","API endpoints","Service registry"],answer:1,explanation:"Schema Registry quản lý schema versions của message trong Kafka topics."},
          {type:"mcq",difficulty:"basic",badge:"Lý thuyết",question:"Backward compatible nghĩa là gì?",options:["Consumer cũ đọc được message mới","Consumer mới đọc được message cũ","Cả hai chiều","Không cho phép thay đổi"],answer:0,explanation:"Backward: old consumer → new message (thêm optional field)."},
          {type:"fill",difficulty:"intermediate",badge:"Điền khuyết",question:"Đảm bảo thứ tự message theo key: gửi cùng key vào cùng ___",expectedKeywords:["partition","partition\n"],explanation:"Gửi cùng key → cùng partition → Kafka đảm bảo thứ tự trong partition."},
          {type:"truefalse",difficulty:"basic",badge:"Đúng/Sai",question:"Nên thay đổi schema message mà không versioning?",answer:false,explanation:"Luôn versioning schema để consumer cũ không bị crash khi schema thay đổi."}
        ]
      }
    ]
  }
];
