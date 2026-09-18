export interface OsQuestion {
  id: number;
  week: number; // 1 to 8
  weekTitle: string;
  topic: string;
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string; // 'a' | 'b' | 'c' | 'd'
  explanation: string;
}

export const OS_WEEKS = [
  { id: 1, title: 'Week 1: Architecture, Registers, Trap & System Calls (Q1 - Q10)', count: 10 },
  { id: 2, title: 'Week 2: Memory Management, Paging & Addressing (Q11 - Q20)', count: 10 },
  { id: 3, title: 'Week 3: Kernel Layout, Process States, Fork & Exec (Q21 - Q30)', count: 10 },
  { id: 4, title: 'Week 4: Interrupts, APIC, Context Switching & Exceptions (Q31 - Q40)', count: 10 },
  { id: 5, title: 'Week 5: CPU Scheduling, Round Robin, SJF & Starvation (Q41 - Q50)', count: 10 },
  { id: 6, title: 'Week 6: Synchronization, Semaphores & Critical Section (Q51 - Q60)', count: 10 },
  { id: 7, title: 'Week 7: Deadlocks, Bankers Algorithm & Thread Models (Q61 - Q70)', count: 10 },
  { id: 8, title: 'Week 8: Security Models (Biba/BLP), Buffer Overflow & ROP (Q71 - Q80)', count: 10 },
];

export const OS_QUESTIONS: OsQuestion[] = [
  // ==================== WEEK 1 (Questions 1 to 10) ====================
  {
    id: 1,
    week: 1,
    weekTitle: 'Week 1',
    topic: 'Address Bus and Representation',
    question: 'For a 32-bit address bus, which of the following hexadecimal numbers is NOT a valid address?',
    options: [
      { id: 'a', text: 'A12345BF' },
      { id: 'b', text: '0A12345B' },
      { id: 'c', text: 'A12345B' },
      { id: 'd', text: 'A12345BFF' }
    ],
    correctOptionId: 'd',
    explanation: 'A 32-bit address contains 32 bits. Since each hexadecimal digit represents 4 bits, a valid 32-bit address can have at most 8 hex digits (32 / 4 = 8). A12345BFF has 9 hex digits (36 bits), which cannot fit on a 32-bit bus.'
  },
  {
    id: 2,
    week: 1,
    weekTitle: 'Week 1',
    topic: 'CPU Pointers and Registers',
    question: 'Which of the following statements is True regarding CPU pointers?\nA. Instruction Pointer points to the next instruction to be executed.\nB. Stack Pointer points to the base of the stack.',
    options: [
      { id: 'a', text: 'A - True, B - True' },
      { id: 'b', text: 'A - False, B - True' },
      { id: 'c', text: 'A - True, B - False' },
      { id: 'd', text: 'A - False, B - False' }
    ],
    correctOptionId: 'c',
    explanation: 'Statement A is True because the Instruction Pointer (IP) keeps track of the next instruction to fetch. Statement B is False because the Stack Pointer (SP) points to the top (current position) of the stack, while the base is referenced by the base pointer (BP).'
  },
  {
    id: 3,
    week: 1,
    weekTitle: 'Week 1',
    topic: 'OS Backward Compatibility',
    question: 'State True or False:\nA backward-compatible Operating System requires all existing applications to be redesigned.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'True only for 64-bit systems' },
      { id: 'd', text: 'True only for Real-Time OS' }
    ],
    correctOptionId: 'b',
    explanation: 'False. Backward compatibility specifically means that newer operating system versions continue to support and execute legacy applications without requiring them to be rewritten or redesigned.'
  },
  {
    id: 4,
    week: 1,
    weekTitle: 'Week 1',
    topic: 'Address Space Protection',
    question: 'State True or False:\nA. Kernel can access user address space.\nB. User cannot access Kernel address space.',
    options: [
      { id: 'a', text: 'A - True, B - True' },
      { id: 'b', text: 'A - False, B - False' },
      { id: 'c', text: 'A - True, B - False' },
      { id: 'd', text: 'A - False, B - True' }
    ],
    correctOptionId: 'a',
    explanation: 'Both statements are True. The privileged kernel can read/write user address space (e.g. to copy system call arguments), but hardware protection rings prevent user programs from directly accessing kernel memory.'
  },
  {
    id: 5,
    week: 1,
    weekTitle: 'Week 1',
    topic: 'Trap Handling Mechanism',
    question: 'State True or False:\nTRAP always jumps to a fixed address.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'Only in microkernels' },
      { id: 'd', text: 'Only during bootup' }
    ],
    correctOptionId: 'a',
    explanation: 'True. A trap instruction transfers execution from user space to a predetermined, fixed entry point (vector table/handler routine) in the kernel to ensure controlled privilege escalation.'
  },
  {
    id: 6,
    week: 1,
    weekTitle: 'Week 1',
    topic: 'Operating System Architecture',
    question: 'State True or False:\nMS-DOS is a non-monolithic OS structure.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'True for DOS 6.22' },
      { id: 'd', text: 'Undefined' }
    ],
    correctOptionId: 'b',
    explanation: 'False. MS-DOS has a simple monolithic structure with no separation between user and kernel modes; application programs can directly interact with the underlying BIOS and hardware.'
  },
  {
    id: 7,
    week: 1,
    weekTitle: 'Week 1',
    topic: 'Concurrent Resource Access',
    question: 'When two applications want to access and modify the same shared resource concurrently without proper synchronization, it leads to a ________.',
    options: [
      { id: 'a', text: 'Race Condition' },
      { id: 'b', text: 'Deadlock' },
      { id: 'c', text: 'Mutual Exclusion' },
      { id: 'd', text: 'None of the above' }
    ],
    correctOptionId: 'a',
    explanation: 'A race condition occurs when multiple processes access and manipulate shared data concurrently and the outcome depends on the order of execution.'
  },
  {
    id: 8,
    week: 1,
    weekTitle: 'Week 1',
    topic: 'System Calls and Mode Switching',
    question: 'State True or False:\nA System Call changes the execution from User Mode to Kernel Mode.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'Only in multithreaded programs' },
      { id: 'd', text: 'Only during hardware errors' }
    ],
    correctOptionId: 'a',
    explanation: 'True. System calls provide the interface between a user program and the OS. Invoking a system call triggers a software interrupt/trap that switches the CPU from unprivileged user mode to privileged kernel mode.'
  },
  {
    id: 9,
    week: 1,
    weekTitle: 'Week 1',
    topic: 'Microkernel Security & Attack Surface',
    question: 'State True or False:\nMicrokernel is likely to have more vulnerabilities than Monolithic Kernel.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'Equal vulnerabilities' },
      { id: 'd', text: 'Depends on CPU brand' }
    ],
    correctOptionId: 'b',
    explanation: 'False. A microkernel contains minimal code in kernel mode (only IPC, basic memory, and scheduling). Because its trusted computing base is much smaller, it has a smaller attack surface and fewer vulnerabilities than a large monolithic kernel.'
  },
  {
    id: 10,
    week: 1,
    weekTitle: 'Week 1',
    topic: 'Process Memory Segments',
    question: 'State True or False:\nHeap section of memory is mainly used for dynamic memory allocation.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'Used only for function arguments' },
      { id: 'd', text: 'Used only for executable code' }
    ],
    correctOptionId: 'a',
    explanation: 'True. The heap segment is explicitly managed at runtime for dynamic memory requests (such as malloc() in C or new in C++), and grows upwards toward the stack.'
  },

  // ==================== WEEK 2 (Questions 11 to 20) ====================
  {
    id: 11,
    week: 2,
    weekTitle: 'Week 2',
    topic: 'Memory Partitioning Algorithms',
    question: 'What are the disadvantages of the best-fit partitioning algorithm?\na) Might lead to fragmentation\nb) Entire process needs to be in RAM\nc) Limit the size of process by RAM size',
    options: [
      { id: 'a', text: 'a, b and c' },
      { id: 'b', text: 'b and c' },
      { id: 'c', text: 'a and c' },
      { id: 'd', text: 'only a' }
    ],
    correctOptionId: 'a',
    explanation: 'In contiguous allocation, Best-fit leaves tiny remaining holes causing severe external fragmentation. Additionally, the entire process must fit contiguously in RAM, limiting process size to available physical RAM.'
  },
  {
    id: 12,
    week: 2,
    weekTitle: 'Week 2',
    topic: 'First-Fit Allocation & External Fragmentation',
    question: 'Consider a memory map using multiprogram-with-partition. Which memory-request sequence will NOT be satisfied using First-Fit (left to right)?',
    options: [
      { id: 'a', text: '50, 80, 80, following first fit' },
      { id: 'b', text: '50, 80, 80, following best fit' },
      { id: 'c', text: '30, 80, 150, following first fit' },
      { id: 'd', text: '30, 80, 150, following best fit' }
    ],
    correctOptionId: 'c',
    explanation: 'In First-Fit, allocating 30 then 80 breaks large contiguous free blocks into smaller fragments, leaving no single contiguous block large enough to satisfy the subsequent 150 KB request.'
  },
  {
    id: 13,
    week: 2,
    weekTitle: 'Week 2',
    topic: 'Page Table Entry Structure',
    question: 'What can you NOT find in a process\'s page table entry?',
    options: [
      { id: 'a', text: 'Present bit' },
      { id: 'b', text: 'Dirty bit' },
      { id: 'c', text: 'Protection bits' },
      { id: 'd', text: 'Sticky bit' }
    ],
    correctOptionId: 'd',
    explanation: 'Present, Dirty, and Protection bits are standard page table entry fields. The sticky bit is a UNIX filesystem permission attribute, not a hardware paging bit.'
  },
  {
    id: 14,
    week: 2,
    weekTitle: 'Week 2',
    topic: '32-Bit Address Space Sizing',
    question: 'In a 32-bit processor architecture, what is the maximum addressable process size?',
    options: [
      { id: 'a', text: '8 GB' },
      { id: 'b', text: '2 GB' },
      { id: 'c', text: '4 GB' },
      { id: 'd', text: '32 GB' }
    ],
    correctOptionId: 'c',
    explanation: 'A 32-bit address bus can index 2^32 distinct byte addresses: 2^32 bytes = 4,294,967,296 bytes = 4 GB.'
  },
  {
    id: 15,
    week: 2,
    weekTitle: 'Week 2',
    topic: 'Dirty Bit in Virtual Memory',
    question: 'What is the Dirty bit in the page table used for?',
    options: [
      { id: 'a', text: 'Indicates if block is in RAM or not' },
      { id: 'b', text: 'Indicates if contents of RAM are modified with respect to swap space/disk' },
      { id: 'c', text: 'Indicates if page has read-only permission' },
      { id: 'd', text: 'Indicates if page belongs to kernel space' }
    ],
    correctOptionId: 'b',
    explanation: 'The dirty (modified) bit is set by hardware whenever a page is written to. When replacing the page, the OS checks this bit: if set (1), the page must be written back to disk.'
  },
  {
    id: 16,
    week: 2,
    weekTitle: 'Week 2',
    topic: 'Two-Level Paging Calculations',
    question: 'In a 32-bit system with 2-level paging, page frame size is 16 KB and page directory uses the top 10 bits. How many entries are in the second-level page table?',
    options: [
      { id: 'a', text: '2^10' },
      { id: 'b', text: '2^9' },
      { id: 'c', text: '2^8' },
      { id: 'd', text: '2^7' }
    ],
    correctOptionId: 'c',
    explanation: 'Page frame = 16 KB = 2^14 bytes (14 bits offset). Remaining virtual bits = 32 - 14 = 18 bits. Page directory uses 10 bits, leaving 18 - 10 = 8 bits for page table. Thus 2^8 = 256 entries.'
  },
  {
    id: 17,
    week: 2,
    weekTitle: 'Week 2',
    topic: 'x86 Memory Translation Units',
    question: 'In x86 systems, what hardware unit converts a logical (virtual) address to a linear address?',
    options: [
      { id: 'a', text: 'CPU Control Unit' },
      { id: 'b', text: 'Segmentation unit' },
      { id: 'c', text: 'Paging unit' },
      { id: 'd', text: 'Physical memory controller' }
    ],
    correctOptionId: 'b',
    explanation: 'The x86 two-stage translation pipeline: Logical Address -> [Segmentation Unit] -> Linear Address -> [Paging Unit] -> Physical Address.'
  },
  {
    id: 18,
    week: 2,
    weekTitle: 'Week 2',
    topic: 'xv6 Address Mapping Macros',
    question: 'In the xv6 kernel memory layout, which of the following macro definitions are correct?\n(V = Virtual, P = Physical)',
    options: [
      { id: 'a', text: 'V2P subtracts KERNBASE, and P2V adds KERNBASE' },
      { id: 'b', text: 'V2P adds KERNBASE, and P2V subtracts KERNBASE' },
      { id: 'c', text: 'Both add KERNBASE' },
      { id: 'd', text: 'Both subtract KERNBASE' }
    ],
    correctOptionId: 'a',
    explanation: 'In xv6: Virtual = Physical + KERNBASE. Therefore: V2P(a) = ((uint)(a) - KERNBASE) and P2V(a) = ((void *)(a) + KERNBASE).'
  },
  {
    id: 19,
    week: 2,
    weekTitle: 'Week 2',
    topic: 'Physical Page Allocation in xv6',
    question: 'Which function in xv6 removes a free physical page from the head of the free linked list to allocate it?',
    options: [
      { id: 'a', text: 'kfree()' },
      { id: 'b', text: 'kalloc()' },
      { id: 'c', text: 'malloc()' },
      { id: 'd', text: 'free()' }
    ],
    correctOptionId: 'b',
    explanation: 'kalloc() allocates a 4096-byte page by detaching it from the head of kmem.freelist. kfree() returns a page back to the list.'
  },
  {
    id: 20,
    week: 2,
    weekTitle: 'Week 2',
    topic: 'CPU Boot Register Initialization',
    question: 'When an x86 CPU boots, which of the following registers are NOT initialized to zero?',
    options: [
      { id: 'a', text: 'Code segment register (CS) and Instruction pointer (EIP/IP)' },
      { id: 'b', text: 'Stack pointer and Base pointer' },
      { id: 'c', text: 'General data registers EAX, EBX' },
      { id: 'd', text: 'Flags register only' }
    ],
    correctOptionId: 'a',
    explanation: 'On power-up/reset, CS is initialized to 0xF000 and IP to 0xFFF0 (reset vector 0xFFFF0) so the CPU can immediately start executing the BIOS boot ROM.'
  },

  // ==================== WEEK 3 (Questions 21 to 30) ====================
  {
    id: 21,
    week: 3,
    weekTitle: 'Week 3',
    topic: 'Kernel Memory Layout in RAM',
    question: 'Which statement is true about the kernel placement in physical memory (RAM) in Linux and xv6?',
    options: [
      { id: 'a', text: 'Kernel resides in the upper part of the physical memory' },
      { id: 'b', text: 'Kernel resides in the lower part of the memory' },
      { id: 'c', text: 'Kernel does not reside in the physical memory' },
      { id: 'd', text: 'Kernel is randomly scattered across pages' }
    ],
    correctOptionId: 'b',
    explanation: 'In typical x86 OS layouts (including xv6 and early Linux), physical memory starting at 1 MB (0x100000) or low memory is reserved for the kernel binary image.'
  },
  {
    id: 22,
    week: 3,
    weekTitle: 'Week 3',
    topic: 'Kernel vs User Stack Separation',
    question: 'State True or False:\nThere is a separate Kernel stack and User stack in the process address space to ensure that stack-based attacks on user stack cannot compromise the kernel.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'True only in real-time systems' },
      { id: 'd', text: 'True only for multi-threaded processes' }
    ],
    correctOptionId: 'a',
    explanation: 'True. Every process has its own user stack (used during ring 3 user code) and a protected kernel stack (used during system calls/interrupts in ring 0). Even if user stack overflows, kernel execution remains safe.'
  },
  {
    id: 23,
    week: 3,
    weekTitle: 'Week 3',
    topic: 'Process Lifecycle & Preemption',
    question: 'A process currently in the RUNNING state is preempted by the scheduler for another process. What is its new state?',
    options: [
      { id: 'a', text: 'NEW' },
      { id: 'b', text: 'READY' },
      { id: 'c', text: 'TERMINATED' },
      { id: 'd', text: 'BLOCKED / WAITING' }
    ],
    correctOptionId: 'b',
    explanation: 'Preemption takes the CPU away from a ready-to-run process. Since it does not need to wait for I/O, it transitions from RUNNING directly back to the READY queue.'
  },
  {
    id: 24,
    week: 3,
    weekTitle: 'Week 3',
    topic: 'fork() Execution Tracing',
    question: 'What is the output in the child process for the following code?\nchar fg = \'O\';\nint pid = fork();\nif (pid != 0) printf("fg = %d", fg + 2);\nelse printf("fg = %d", fg - 2);',
    options: [
      { id: 'a', text: 'fg = M' },
      { id: 'b', text: 'fg = Q' },
      { id: 'c', text: 'fg = 77' },
      { id: 'd', text: 'fg = 81' }
    ],
    correctOptionId: 'c',
    explanation: 'In the child process, fork() returns 0, entering the else branch. Character \'O\' has ASCII value 79. Computing 79 - 2 = 77, and printing with %d outputs "fg = 77".'
  },
  {
    id: 25,
    week: 3,
    weekTitle: 'Week 3',
    topic: 'fork() and exec() System Calls',
    question: 'Which of the following are TRUE about the fork() system call?\n1. All parent pages are initially marked as shared (Copy-on-Write)\n2. fork() returns 0 to parent process\n3. fork() returns parent PID to child process\n4. exec() is invoked in child process to run another program image',
    options: [
      { id: 'a', text: 'Options 1 and 4' },
      { id: 'b', text: 'Options 2 and 3' },
      { id: 'c', text: 'Options 1 and 3' },
      { id: 'd', text: 'All 1, 2, 3, 4' }
    ],
    correctOptionId: 'a',
    explanation: 'fork() creates a duplicate process using Copy-on-Write (pages shared read-only initially). In the child, exec() replaces the address space with a new program. (fork returns child PID to parent, and 0 to child).'
  },
  {
    id: 26,
    week: 3,
    weekTitle: 'Week 3',
    topic: 'Involuntary Process Termination',
    question: 'Which of the following system calls/mechanisms can be used to terminate a process involuntarily from another process?',
    options: [
      { id: 'a', text: 'fork' },
      { id: 'b', text: 'kill' },
      { id: 'c', text: 'exec' },
      { id: 'd', text: 'exit' }
    ],
    correctOptionId: 'b',
    explanation: 'kill(pid, SIGKILL) sends an asynchronous termination signal to another process, killing it involuntarily. exit() is voluntary termination by the process itself.'
  },
  {
    id: 27,
    week: 3,
    weekTitle: 'Week 3',
    topic: 'Zombie Processes and wait()',
    question: 'Which of the following is true regarding Zombie process entries in the process table?',
    options: [
      { id: 'a', text: 'A zombie entry is removed when its parent reads its exit status via wait()' },
      { id: 'b', text: 'A process is removed immediately upon termination without ever becoming a zombie' },
      { id: 'c', text: 'Zombies consume entire RAM address space indefinitely' },
      { id: 'd', text: 'Orphan processes can never become zombies' }
    ],
    correctOptionId: 'a',
    explanation: 'When a child exits, its PCB remains in the process table as a zombie to preserve its exit status code until the parent calls wait() or waitpid().'
  },
  {
    id: 28,
    week: 3,
    weekTitle: 'Week 3',
    topic: 'exit() and Parent Notification',
    question: 'State True or False:\nWhen an exit() system call is executed by a child, a wakeup signal (SIGCHLD) is sent to its parent process because the parent may be sleeping in wait().',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'Only in Unix V6' },
      { id: 'd', text: 'Only if parent is root' }
    ],
    correctOptionId: 'a',
    explanation: 'True. The kernel wakes up any sleeping parent waiting on its child so the parent can harvest the termination exit status code and release the child PCB.'
  },
  {
    id: 29,
    week: 3,
    weekTitle: 'Week 3',
    topic: 'wait() System Call Semantics',
    question: 'State True or False:\nWhen the wait() system call is invoked by a parent with multiple children, it will stay blocked until ALL of its child processes exit.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'True in POSIX compliant systems' },
      { id: 'd', text: 'True if multithreading is enabled' }
    ],
    correctOptionId: 'b',
    explanation: 'False. A standard wait() system call blocks until ANY single child process terminates. To wait for all children, wait() must be called in a loop.'
  },
  {
    id: 30,
    week: 3,
    weekTitle: 'Week 3',
    topic: 'ELF Binary File Format',
    question: 'Which of the following is NOT part of a standard ELF (Executable and Linkable Format) header?',
    options: [
      { id: 'a', text: 'Magic number (0x7F \'E\' \'L\' \'F\')' },
      { id: 'b', text: 'File Type (executable, relocatable, shared)' },
      { id: 'c', text: 'Network connection details' },
      { id: 'd', text: 'Target Machine architecture' }
    ],
    correctOptionId: 'c',
    explanation: 'An ELF header specifies file identification, magic number, type, entry point address, and target machine architecture. Network connection configuration is not part of binary file headers.'
  },

  // ==================== WEEK 4 (Questions 31 to 40) ====================
  {
    id: 31,
    week: 4,
    weekTitle: 'Week 4',
    topic: 'Context Switching Conditions',
    question: 'State True or False:\nA context switch occurs when a process state changes from New to Ready.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'True for batch systems' },
      { id: 'd', text: 'True only during swapping' }
    ],
    correctOptionId: 'b',
    explanation: 'False. Moving from New to Ready simply inserts the newly created process into the ready queue. A context switch occurs only when the CPU switches execution from one currently running process/thread to another.'
  },
  {
    id: 32,
    week: 4,
    weekTitle: 'Week 4',
    topic: 'Hardware Interrupt Classification',
    question: 'A thermal sensor in the CPU detects temperature exceeding 40°C and signals the CPU to initiate shutdown. What type of interrupt is this?',
    options: [
      { id: 'a', text: 'Hardware interrupt' },
      { id: 'b', text: 'Software interrupt' },
      { id: 'c', text: 'Trap' },
      { id: 'd', text: 'System Call' }
    ],
    correctOptionId: 'a',
    explanation: 'Because the signal is triggered directly by physical hardware circuitry (the thermal sensor) requiring immediate CPU handling, it is classified as a hardware interrupt.'
  },
  {
    id: 33,
    week: 4,
    weekTitle: 'Week 4',
    topic: 'Hardware Interrupt Handling Sequence',
    question: 'What is the correct sequence of events when handling a hardware interrupt?\nI. Device raises interrupt\nII. CPU checks INT pin and sends INT ACK\nIII. Interrupt Handler Routine (ISR) is executed\nIV. Interrupt Controller sends INT signal to CPU\nV. CPU identifies which device raised the interrupt',
    options: [
      { id: 'a', text: 'I, II, III, IV, V' },
      { id: 'b', text: 'V, I, IV, II, III' },
      { id: 'c', text: 'I, IV, II, V, III' },
      { id: 'd', text: 'II, IV, I, V, III' }
    ],
    correctOptionId: 'c',
    explanation: 'Step I: Device asserts interrupt line -> Step IV: PIC/APIC routes INT to CPU -> Step II: CPU acknowledges via INTA -> Step V: Vector number fetched to identify device -> Step III: Corresponding ISR executes.'
  },
  {
    id: 34,
    week: 4,
    weekTitle: 'Week 4',
    topic: 'I/O APIC vs Local APIC',
    question: 'State True or False:\nI/O APICs are used to handle interrupts from thermal sensors and internal timers.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'True in uniprocessors' },
      { id: 'd', text: 'True in NUMA architectures' }
    ],
    correctOptionId: 'b',
    explanation: 'False. Internal timers and core thermal sensors deliver interrupts directly through each CPU core\'s Local APIC. I/O APICs are dedicated to routing external peripheral device interrupts.'
  },
  {
    id: 35,
    week: 4,
    weekTitle: 'Week 4',
    topic: 'x86 Exceptions: Trap, Fault, Abort',
    question: 'Match the x86 interrupt vectors with their exception type:\nI. #OF (Overflow)\nII. #DF (Double Fault)\nIII. #SS (Stack Segment Fault)',
    options: [
      { id: 'a', text: 'I - Trap, II - Abort, III - Fault' },
      { id: 'b', text: 'I - Fault, II - Trap, III - Abort' },
      { id: 'c', text: 'I - Abort, II - Fault, III - Trap' },
      { id: 'd', text: 'I - Trap, II - Fault, III - Abort' }
    ],
    correctOptionId: 'a',
    explanation: 'In x86: #OF (Overflow) is a Trap (reported after instruction executes), #DF (Double Fault) is an unrecoverable Abort, and #SS (Stack Segment) is a restartable Fault.'
  },
  {
    id: 36,
    week: 4,
    weekTitle: 'Week 4',
    topic: 'Non-Preemptive Scheduling Permutations',
    question: 'A CPU has 4 processes ready to execute and uses a non-preemptive scheduler. How many total distinct execution schedules are possible?',
    options: [
      { id: 'a', text: '12' },
      { id: 'b', text: '16' },
      { id: 'c', text: '24' },
      { id: 'd', text: '64' }
    ],
    correctOptionId: 'c',
    explanation: 'In non-preemptive scheduling, each selected process runs to completion. The total possible execution orderings for 4 processes is 4! = 4 × 3 × 2 × 1 = 24.'
  },
  {
    id: 37,
    week: 4,
    weekTitle: 'Week 4',
    topic: 'System Call Numbers in OS',
    question: 'State True or False:\nMore than one system call in an operating system can have the exact same system call number.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'True in 64-bit kernels' },
      { id: 'd', text: 'True for read() and write()' }
    ],
    correctOptionId: 'b',
    explanation: 'False. The system call number is an integer index into the kernel\'s system call table (sys_call_table). Every system call must have a unique identifier.'
  },
  {
    id: 38,
    week: 4,
    weekTitle: 'Week 4',
    topic: 'System Call Parameter Passing',
    question: 'State True or False:\nParameters in system calls are passed using user-mode stacks in Linux and by using registers in xv6.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'True on ARM architectures' },
      { id: 'd', text: 'True for 32-bit Linux only' }
    ],
    correctOptionId: 'b',
    explanation: 'False. Modern Linux uses CPU registers (rdi, rsi, rdx, r10, r8, r9 on x86-64) for fast system call parameter passing, whereas xv6 on x86 fetches parameters off the user stack via trapframe pointers.'
  },
  {
    id: 39,
    week: 4,
    weekTitle: 'Week 4',
    topic: 'Process Transitions Causing Context Switches',
    question: 'Identify which of the following transitions can directly result in a CPU context switch:\nI. Blocked to Ready\nII. Running to Zombie\nIII. Running to Ready',
    options: [
      { id: 'a', text: 'I - False, II - True, III - True' },
      { id: 'b', text: 'I - True, II - True, III - True' },
      { id: 'c', text: 'I - True, II - False, III - False' },
      { id: 'd', text: 'I - False, II - False, III - True' }
    ],
    correctOptionId: 'a',
    explanation: 'Blocked to Ready simply places a process into the ready queue (the current running process keeps executing). But when a process terminates (Running -> Zombie) or is preempted (Running -> Ready), the CPU must switch to another process.'
  },
  {
    id: 40,
    week: 4,
    weekTitle: 'Week 4',
    topic: 'Timer Interrupt Latency',
    question: 'State True or False:\nTimer interrupt latency should be as high as possible for smooth context switching.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'True for batch workloads' },
      { id: 'd', text: 'True in hypervisors' }
    ],
    correctOptionId: 'b',
    explanation: 'False. Interrupt latency is the delay between the interrupt firing and the CPU beginning the ISR. For responsive scheduling and smooth multitasking, interrupt latency should be as low as possible.'
  },

  // ==================== WEEK 5 (Questions 41 to 50) ====================
  {
    id: 41,
    week: 5,
    weekTitle: 'Week 5',
    topic: 'Starvation and Aging Technique',
    question: 'State True or False:\nAging is an effective solution to the process starvation problem in priority scheduling.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'True only for real-time threads' },
      { id: 'd', text: 'False because it causes deadlocks' }
    ],
    correctOptionId: 'a',
    explanation: 'True. Aging gradually increases the priority of low-priority processes that wait in the ready queue for long periods, guaranteeing they will eventually execute.'
  },
  {
    id: 42,
    week: 5,
    weekTitle: 'Week 5',
    topic: 'Round Robin Process Completion Time',
    question: 'Processes A(burst 4ns), B(burst 5ns), C(burst 6ns), D(burst 7ns) arrive at 0, 0.1, 0.2, 0.3 ns. Scheduled via Round Robin (quantum 2ns). At what time does process A complete?',
    options: [
      { id: 'a', text: '8 ns' },
      { id: 'b', text: '10 ns' },
      { id: 'c', text: '12 ns' },
      { id: 'd', text: '14 ns' }
    ],
    correctOptionId: 'b',
    explanation: 'Time 0-2: A (rem 2); 2-4: B (rem 3); 4-6: C (rem 4); 6-8: D (rem 5); 8-10: A executes remaining 2 ns and finishes at 10 ns.'
  },
  {
    id: 43,
    week: 5,
    weekTitle: 'Week 5',
    topic: 'Round Robin Total Work Completion',
    question: 'For the same processes A(4), B(5), C(6), D(7) with time quantum 2ns (ignoring context switch overhead): At what time will ALL processes complete execution?',
    options: [
      { id: 'a', text: '20 ns' },
      { id: 'b', text: '22 ns' },
      { id: 'c', text: '24 ns' },
      { id: 'd', text: '28 ns' }
    ],
    correctOptionId: 'b',
    explanation: 'Without overhead, the CPU operates continuously until all burst times finish: Total completion time = 4 + 5 + 6 + 7 = 22 ns.'
  },
  {
    id: 44,
    week: 5,
    weekTitle: 'Week 5',
    topic: 'Round Robin Execution Trace',
    question: 'Processes A(5ns, arr 0), B(7ns, arr 1), C(9ns, arr 2), D(11ns, arr 3) are scheduled via Round Robin with quantum 2ns. At what time will process C complete?',
    options: [
      { id: 'a', text: '25 ns' },
      { id: 'b', text: '27 ns' },
      { id: 'c', text: '29 ns' },
      { id: 'd', text: '31 ns' }
    ],
    correctOptionId: 'c',
    explanation: 'Tracing the schedule: 0-2:A, 2-4:B, 4-6:C, 6-8:D, 8-10:A, 10-12:B, 12-14:C, 14-16:D, 16-17:A(done), 17-19:B, 19-21:C, 21-23:D, 23-24:B(done), 24-26:C, 26-28:D, 28-29:C finishes at 29 ns.'
  },
  {
    id: 45,
    week: 5,
    weekTitle: 'Week 5',
    topic: 'Total Execution Time in Preemptive Schedulers',
    question: 'For the workload A(5), B(7), C(9), D(11) with quantum 2ns, at what time do ALL processes complete?',
    options: [
      { id: 'a', text: '30 ns' },
      { id: 'b', text: '32 ns' },
      { id: 'c', text: '35 ns' },
      { id: 'd', text: '36 ns' }
    ],
    correctOptionId: 'b',
    explanation: 'Total CPU work = 5 + 7 + 9 + 11 = 32 ns. Since the CPU is never idle once started, all processes finish at 32 ns.'
  },
  {
    id: 46,
    week: 5,
    weekTitle: 'Week 5',
    topic: 'Shortest Job First (SJF) Completion',
    question: 'For A(5ns, arr 0), B(7ns, arr 1), C(9ns, arr 2), D(11ns, arr 3), what is the completion time of C under non-preemptive Shortest Job First (SJF)?',
    options: [
      { id: 'a', text: '12 ns' },
      { id: 'b', text: '18 ns' },
      { id: 'c', text: '21 ns' },
      { id: 'd', text: '26 ns' }
    ],
    correctOptionId: 'c',
    explanation: 'At time 0, only A is available: runs 0 to 5. At t=5, B(7), C(9), D(11) are ready. SJF chooses shortest: B runs 5 to 12. Next shortest C runs 12 to 21. C completes at 21 ns.'
  },
  {
    id: 47,
    week: 5,
    weekTitle: 'Week 5',
    topic: 'SJF vs Round Robin Context Switches',
    question: 'State True or False:\nMany more context switches occur when using non-preemptive Shortest Job First (SJF) scheduling compared to Round Robin scheduling.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'True if bursts are small' },
      { id: 'd', text: 'True on multi-core CPUs' }
    ],
    correctOptionId: 'b',
    explanation: 'False. Non-preemptive SJF switches context only when a process terminates (n context switches for n jobs). Round Robin preempts processes repeatedly after every time slice, producing far more context switches.'
  },
  {
    id: 48,
    week: 5,
    weekTitle: 'Week 5',
    topic: 'Round Robin Quantum Extremes',
    question: 'State True or False:\nA Round Robin scheduling algorithm with an exceptionally large time slice behaves similarly to a First-Come-First-Serve (FCFS) algorithm.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'Behaves like Shortest Job First' },
      { id: 'd', text: 'Behaves like Priority Scheduling' }
    ],
    correctOptionId: 'a',
    explanation: 'True. If the quantum is larger than the longest process burst time, no process is ever preempted before completion. Thus processes run to completion in arrival order (FCFS).'
  },
  {
    id: 49,
    week: 5,
    weekTitle: 'Week 5',
    topic: 'Time Slice Overhead Relationship',
    question: 'State True or False:\nThe overhead due to context switches is less if the time-slice duration is small.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'True for I/O bound jobs' },
      { id: 'd', text: 'True in distributed systems' }
    ],
    correctOptionId: 'b',
    explanation: 'False. A smaller time-slice causes frequent preemptions, resulting in more context switches and higher CPU overhead spent saving/restoring register states.'
  },
  {
    id: 50,
    week: 5,
    weekTitle: 'Week 5',
    topic: 'Starvation in SJF and SRTF',
    question: 'State True or False:\nStarvation can occur in both the Shortest Remaining Time First (SRTF) and Shortest Job First (SJF) algorithms.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'Only in SJF' },
      { id: 'd', text: 'Only in SRTF' }
    ],
    correctOptionId: 'a',
    explanation: 'True. If a continuous stream of short processes keeps arriving in the ready queue, long processes may wait indefinitely in both SJF and SRTF.'
  },

  // ==================== WEEK 6 (Questions 51 to 60) ====================
  {
    id: 51,
    week: 6,
    weekTitle: 'Week 6',
    topic: 'Counting Semaphore Negative Values',
    question: 'If the value of a counting semaphore is s = -5, what does this imply?',
    options: [
      { id: 'a', text: 'The number of processes that can enter the critical section is 2' },
      { id: 'b', text: 'The number of processes blocked from entering the critical section is 5' },
      { id: 'c', text: 'Total number of processes in critical section is 5' },
      { id: 'd', text: 'The semaphore has suffered an underflow error' }
    ],
    correctOptionId: 'b',
    explanation: 'In counting semaphores that track waiting queues, a negative semaphore value has a magnitude equal to the number of processes currently blocked and waiting in the semaphore queue.'
  },
  {
    id: 52,
    week: 6,
    weekTitle: 'Week 6',
    topic: 'Concurrency Issues Without Synchronization',
    question: 'Which of the following conditions can occur due to lack of process synchronization?',
    options: [
      { id: 'a', text: 'Inconsistency' },
      { id: 'b', text: 'Loss of information / Lost updates' },
      { id: 'c', text: 'Deadlock' },
      { id: 'd', text: 'All of these' }
    ],
    correctOptionId: 'd',
    explanation: 'Unsynchronized concurrent access to shared resources can cause inconsistent data states, race conditions leading to overwritten/lost updates, and resource deadlocks.'
  },
  {
    id: 53,
    week: 6,
    weekTitle: 'Week 6',
    topic: 'Semaphore Capacity & Blocking',
    question: 'State True or False:\nIf the value of a counting semaphore is s = 4, then the maximum number of wait requests for the critical section before it blocks is 0.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'True for binary semaphores' },
      { id: 'd', text: 'True only in Linux' }
    ],
    correctOptionId: 'b',
    explanation: 'False. With initial value s = 4, four consecutive P()/wait() operations can decrement the semaphore (4 -> 3 -> 2 -> 1 -> 0) without blocking.'
  },
  {
    id: 54,
    week: 6,
    weekTitle: 'Week 6',
    topic: 'Critical Section Definition',
    question: 'A critical section is a program segment:',
    options: [
      { id: 'a', text: 'Which should run in a certain specified amount of time' },
      { id: 'b', text: 'Which should avoid deadlock' },
      { id: 'c', text: 'Which must be enclosed by a pair of semaphores P and V' },
      { id: 'd', text: 'Where shared resources (variables/files) are accessed' }
    ],
    correctOptionId: 'd',
    explanation: 'By definition, a critical section is the code block where a process accesses and modifies shared variables, tables, or devices that must not be accessed concurrently.'
  },
  {
    id: 55,
    week: 6,
    weekTitle: 'Week 6',
    topic: 'Peterson\'s Algorithm Limitations',
    question: 'State True or False:\nPeterson\'s solution is a software synchronization mechanism designed for a maximum of 2 processes.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'Works for n processes' },
      { id: 'd', text: 'Works only on single-core CPUs' }
    ],
    correctOptionId: 'a',
    explanation: 'True. The classical Peterson\'s solution uses two shared variables (flag[2] and turn) and is restricted to mutual exclusion between exactly two concurrent processes (P0 and P1).'
  },
  {
    id: 56,
    week: 6,
    weekTitle: 'Week 6',
    topic: 'Concurrent Interleaving Outputs',
    question: 'Processes P1(A=A+1; B=B+1) and P2(A=A*2; B=B*2) run concurrently updating shared A=1, B=1 atomically. How many possible distinct sets of values can (A, B) take?',
    options: [
      { id: 'a', text: '2' },
      { id: 'b', text: '3' },
      { id: 'c', text: '4' },
      { id: 'd', text: '6' }
    ],
    correctOptionId: 'b',
    explanation: 'For any single variable: if P1 runs before P2 -> (1+1)*2 = 4. If P2 runs before P1 -> (1*2)+1 = 3. Because the operations can interleave, the possible outcomes for (A, B) are (4, 4), (4, 3), and (3, 4). Total = 3 sets.'
  },
  {
    id: 57,
    week: 6,
    weekTitle: 'Week 6',
    topic: 'Shared Variable Interleaving States',
    question: 'In the previous program with P1(B=B+1) and P2(B=B*2) starting from B=1: What updated values can variable B possibly take other than the initial value?',
    options: [
      { id: 'a', text: '1, 2, 3, 4' },
      { id: 'b', text: '2, 3' },
      { id: 'c', text: '1, 3, 4' },
      { id: 'd', text: '3, 4' }
    ],
    correctOptionId: 'd',
    explanation: 'If P1 runs first: 1 -> 2 -> 4. If P2 runs first: 1 -> 2 -> 3. The final updated values for B after both processes execute are either 3 or 4.'
  },
  {
    id: 58,
    week: 6,
    weekTitle: 'Week 6',
    topic: 'Atomic Hardware Instructions (XCHG)',
    question: 'State True or False:\nThe XCHG assembly instruction returns 1 if the operation succeeds and returns 0 if the operation fails.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'True in x86-64 only' },
      { id: 'd', text: 'True for Test-and-Set' }
    ],
    correctOptionId: 'b',
    explanation: 'False. XCHG atomically swaps the contents of two registers/memory operands. It does not return a boolean 1/0 status code.'
  },
  {
    id: 59,
    week: 6,
    weekTitle: 'Week 6',
    topic: 'Counting Semaphore Arithmetic',
    question: 'An application executes counting semaphore operations in order: 10P, 2P, 3V, 2V, 4P, 3V. If the final semaphore value is -5, what was its initial value?',
    options: [
      { id: 'a', text: '1' },
      { id: 'b', text: '2' },
      { id: 'c', text: '3' },
      { id: 'd', text: '5' }
    ],
    correctOptionId: 'c',
    explanation: 'Total P operations (decrement) = 10 + 2 + 4 = 16. Total V operations (increment) = 3 + 2 + 3 = 8. Net change = -16 + 8 = -8. Equation: x - 8 = -5 => x = 3.'
  },
  {
    id: 60,
    week: 6,
    weekTitle: 'Week 6',
    topic: 'Atomicity of Code Statements',
    question: 'Consider statements: i) if (count == 0) and ii) add %eax, %ebx. Which of the following is correct?',
    options: [
      { id: 'a', text: 'i is atomic, ii is not-atomic' },
      { id: 'b', text: 'i is not-atomic, ii is not-atomic' },
      { id: 'c', text: 'i is not-atomic, ii is atomic' },
      { id: 'd', text: 'Both are atomic' }
    ],
    correctOptionId: 'c',
    explanation: 'Statement (i) is a high-level language statement involving multiple assembly operations (read, compare, branch), hence non-atomic. Statement (ii) is a single CPU machine instruction, treated as atomic.'
  },

  // ==================== WEEK 7 (Questions 61 to 70) ====================
  {
    id: 61,
    week: 7,
    weekTitle: 'Week 7',
    topic: 'Peterson\'s Algorithm Shared Variables',
    question: 'A friend states: "In Peterson\'s algorithm there is a race condition for the shared variable favoured/turn." What is the correct technical response?',
    options: [
      { id: 'a', text: 'That\'s false, there is never a race condition.' },
      { id: 'b', text: 'That\'s true, but this race condition helps break potential deadlock in the critical section.' },
      { id: 'c', text: 'That\'s true, and it causes mutual exclusion to fail.' },
      { id: 'd', text: 'It causes starvation of both processes.' }
    ],
    correctOptionId: 'b',
    explanation: 'Both processes may concurrently write to \'turn\' / \'favoured\'. The last write overwrites the earlier write; this intentional resolution determines who yields priority, effectively breaking symmetric deadlocks.'
  },
  {
    id: 62,
    week: 7,
    weekTitle: 'Week 7',
    topic: 'Deadlock in Non-Multiprogramming OS',
    question: 'In a non-multiprogramming (single-tasking) operating system, a resource deadlock would ________.',
    options: [
      { id: 'a', text: 'Occur frequently' },
      { id: 'b', text: 'Occur only during I/O operations' },
      { id: 'c', text: 'Never occur' },
      { id: 'd', text: 'Depend on CPU clock speed' }
    ],
    correctOptionId: 'c',
    explanation: 'In a non-multiprogramming system, only one process executes at any given time until completion. Since multiple processes cannot concurrently hold and wait for resources, circular wait and deadlocks can never occur.'
  },
  {
    id: 63,
    week: 7,
    weekTitle: 'Week 7',
    topic: 'Dining Philosophers Deadlock Prevention',
    question: 'What is the minimum number of forks required to guarantee that deadlock NEVER arises in a Dining Philosophers problem with 10 philosophers?',
    options: [
      { id: 'a', text: '10' },
      { id: 'b', text: '11' },
      { id: 'c', text: '15' },
      { id: 'd', text: '20' }
    ],
    correctOptionId: 'b',
    explanation: 'With 10 philosophers each needing 2 forks, if there are only 10 forks, all 10 can pick up 1 fork simultaneously resulting in deadlock. Adding 1 extra fork (10 + 1 = 11) ensures at least one philosopher can acquire 2 forks.'
  },
  {
    id: 64,
    week: 7,
    weekTitle: 'Week 7',
    topic: 'Resource Allocation Graph Analysis',
    question: 'State True or False:\nIf a Resource Allocation Graph contains multiple instances of resource types and has a cycle, it ALWAYS leads to a deadlock.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'True only for single-unit resources' },
      { id: 'd', text: 'True in distributed OS' }
    ],
    correctOptionId: 'b',
    explanation: 'False. A cycle is a necessary and sufficient condition for deadlock ONLY when every resource type has exactly one instance. With multiple resource instances, a cycle does not necessarily imply a deadlock.'
  },
  {
    id: 65,
    week: 7,
    weekTitle: 'Week 7',
    topic: 'Banker\'s Algorithm Safe Sequences',
    question: 'In a system running processes P1, P2, P3, P4, which of the following represents a valid safe sequence where all processes can satisfy their maximum need?',
    options: [
      { id: 'a', text: 'P4 -> P2 -> P1 -> P3' },
      { id: 'b', text: 'P1 -> P2 -> P3 -> P4' },
      { id: 'c', text: 'P3 -> P1 -> P2 -> P4' },
      { id: 'd', text: 'No safe sequence exists' }
    ],
    correctOptionId: 'a',
    explanation: 'Evaluating the Need matrix against Work/Available resources demonstrates that P4 finishes first, releasing resources to allow P2, then P1, and finally P3 to complete.'
  },
  {
    id: 66,
    week: 7,
    weekTitle: 'Week 7',
    topic: 'User-Level vs Kernel-Level Threads',
    question: 'Which of the following statements comparing user-level threads and kernel-level threads is FALSE?',
    options: [
      { id: 'a', text: 'User threads can switch fast since it does not involve kernel context switches.' },
      { id: 'b', text: 'User threads are lightweight since they do not require system calls.' },
      { id: 'c', text: 'A process with a higher number of user threads will be allocated more execution time slices by the OS.' },
      { id: 'd', text: 'The kernel is aware of the behavior of kernel threads (blocking vs runnable).' }
    ],
    correctOptionId: 'c',
    explanation: 'Statement (c) is False. The kernel schedules processes without knowledge of how many user-level threads exist inside a process. Having more user threads does not grant extra CPU time slices.'
  },
  {
    id: 67,
    week: 7,
    weekTitle: 'Week 7',
    topic: 'Deadlock-Free Resource Formula',
    question: 'A system contains 4 programs (P1, P2, P3, P4). Each program requires 5 tape units. What is the minimum number of tape units required so that deadlocks NEVER arise?',
    options: [
      { id: 'a', text: '16' },
      { id: 'b', text: '17' },
      { id: 'c', text: '20' },
      { id: 'd', text: '21' }
    ],
    correctOptionId: 'b',
    explanation: 'Formula: R_min = Σ(Max_need - 1) + 1 = 4 × (5 - 1) + 1 = (4 × 4) + 1 = 17 tape units.'
  },
  {
    id: 68,
    week: 7,
    weekTitle: 'Week 7',
    topic: 'Maximum Resource Units Leading to Deadlock',
    question: 'Three processes require resource R: P1 requires 5 units, P2 requires 15 units, P3 requires 20 units. What is the MAXIMUM number of units of R that can lead to a deadlock?',
    options: [
      { id: 'a', text: '35' },
      { id: 'b', text: '36' },
      { id: 'c', text: '37' },
      { id: 'd', text: '38' }
    ],
    correctOptionId: 'c',
    explanation: 'Deadlock occurs when every process holds one unit less than its maximum requirement and waits: Max deadlock allocation = (5 - 1) + (15 - 1) + (20 - 1) = 4 + 14 + 19 = 37 units.'
  },
  {
    id: 69,
    week: 7,
    weekTitle: 'Week 7',
    topic: 'Thread Synchronization Rationale',
    question: 'State True or False:\nThread synchronization is required because all threads belonging to the same process share the same address space and global variables.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'Only in distributed environments' },
      { id: 'd', text: 'False because threads have private registers' }
    ],
    correctOptionId: 'a',
    explanation: 'True. Threads within a process share the heap, global data segment, and open files. Unsynchronized concurrent writes produce race conditions and corrupted memory states.'
  },
  {
    id: 70,
    week: 7,
    weekTitle: 'Week 7',
    topic: 'Kernel-Level Thread Characteristics',
    question: 'Which of the following statements about kernel-level threads is FALSE?',
    options: [
      { id: 'a', text: 'Context switch time is longer for kernel-level threads than for user-level threads.' },
      { id: 'b', text: 'User-level threads do not need any hardware support.' },
      { id: 'c', text: 'Related kernel-level threads can be scheduled on different processors in a multiprocessor.' },
      { id: 'd', text: 'Blocking one kernel-level thread blocks all other related threads in the process.' }
    ],
    correctOptionId: 'd',
    explanation: 'Statement (d) is False. Because kernel-level threads are individually managed by the OS scheduler, if one thread blocks on I/O, other threads in the same process can continue executing on other cores.'
  },

  // ==================== WEEK 8 (Questions 71 to 80) ====================
  {
    id: 71,
    week: 8,
    weekTitle: 'Week 8',
    topic: 'Discretionary Access Control (DAC)',
    question: 'In Discretionary Access Control with commands CONFER_execute(S, S\', O) and ADD_write(S, O): Which statement is true regarding rights leakage?',
    options: [
      { id: 'a', text: 'There is no leakage of rights due to these commands.' },
      { id: 'b', text: 'A leakage may occur when an owner of an object executes CONFER_execute().' },
      { id: 'c', text: 'A leakage may occur when a user with execute permissions executes ADD_write().' },
      { id: 'd', text: 'Both B and C are correct.' }
    ],
    correctOptionId: 'd',
    explanation: 'Both B and C are correct. An owner can confer execute rights to another subject, and a subject with execute rights can cause write permissions to be entered, both leading to potential access rights leakage.'
  },
  {
    id: 72,
    week: 8,
    weekTitle: 'Week 8',
    topic: 'Software Security Vulnerabilities',
    question: 'Match the terms with their definitions:\na) Trojan-horse\nb) Buffer Overflow\nc) Double free\n1) Excess data corrupts values in adjacent memory addresses\n2) Memory is freed more than once for a specific address\n3) Malicious code disguising as legitimate code to claim privileges',
    options: [
      { id: 'a', text: 'a-3, b-1, c-2' },
      { id: 'b', text: 'a-1, b-2, c-3' },
      { id: 'c', text: 'a-2, b-3, c-1' },
      { id: 'd', text: 'a-3, b-2, c-1' }
    ],
    correctOptionId: 'a',
    explanation: 'Trojan-horse disguises malicious code as legitimate (3); Buffer Overflow writes beyond array boundaries corrupting adjacent memory (1); Double free frees an already freed heap pointer (2).'
  },
  {
    id: 73,
    week: 8,
    weekTitle: 'Week 8',
    topic: 'Biba Integrity Model',
    question: 'State True or False:\nIn the Biba model, information from a top-secret object will not flow to secret clearance.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'True in military systems' },
      { id: 'd', text: 'Depends on object type' }
    ],
    correctOptionId: 'b',
    explanation: 'False. The Biba model enforces data INTEGRITY (no write up, no read down), not confidentiality. In Biba, higher integrity subjects can read lower integrity objects and write down, so confidentiality flow rules do not apply.'
  },
  {
    id: 74,
    week: 8,
    weekTitle: 'Week 8',
    topic: 'Bell-LaPadula Confidentiality Model',
    question: 'State True or False:\nIn the Bell-LaPadula model, information from a top-secret object will not flow to secret clearance.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'True for read operations' },
      { id: 'd', text: 'True for write operations' }
    ],
    correctOptionId: 'b',
    explanation: 'False. While the *-property prevents writing down (no write down), reading from top-secret by lower clearance is prohibited, but specific information declassification or trusted subjects can allow information flow under BLP rules.'
  },
  {
    id: 75,
    week: 8,
    weekTitle: 'Week 8',
    topic: 'Biba Model for Integrity Enforcement',
    question: 'User X with clearance Secret transfers information to third party Y, and Y tries to make changes to an object in the Top-Secret class. This unauthorized modification is prevented by:',
    options: [
      { id: 'a', text: 'Implementing access control matrix' },
      { id: 'b', text: 'Implementing Bell-LaPadula model' },
      { id: 'c', text: 'Implementing the Biba Model' },
      { id: 'd', text: 'None of the above' }
    ],
    correctOptionId: 'c',
    explanation: 'The Biba Model prevents low-integrity users from modifying high-integrity objects ("no write up"). Therefore, Y cannot make unauthorized changes to Top-Secret integrity data.'
  },
  {
    id: 76,
    week: 8,
    weekTitle: 'Week 8',
    topic: 'Binary Exploits and Defenses',
    question: 'Match the exploit terms with descriptions:\na) Gadget\nb) ASLR\nc) Shellcode\nd) Canaries\n1) Pseudo-random number detecting buffer overflow\n2) Short instruction sequence ending in ret\n3) May execute in stack if NX bit is disabled\n4) Helps prevent ROP attacks by randomizing layout',
    options: [
      { id: 'a', text: 'a-2, b-4, c-3, d-1' },
      { id: 'b', text: 'a-1, b-2, c-3, d-4' },
      { id: 'c', text: 'a-4, b-3, c-2, d-1' },
      { id: 'd', text: 'a-2, b-1, c-4, d-3' }
    ],
    correctOptionId: 'a',
    explanation: 'Gadget = short code ending in return (2); ASLR = address randomization preventing ROP (4); Shellcode = machine code injected into stack (3); Stack Canary = integrity canary word detecting smash (1).'
  },
  {
    id: 77,
    week: 8,
    weekTitle: 'Week 8',
    topic: 'Stack Frame Push Order',
    question: 'Arrange the following according to the order in which they are placed on the call stack during a function invocation:\na) Return address\nb) Function call parameters\nc) Local variables allocated\nd) Previous frame pointer (EBP/RBP)',
    options: [
      { id: 'a', text: 'b, a, d, c' },
      { id: 'b', text: 'a, b, c, d' },
      { id: 'c', text: 'c, d, a, b' },
      { id: 'd', text: 'b, d, a, c' }
    ],
    correctOptionId: 'a',
    explanation: 'Call sequence: Caller pushes arguments (b) -> CALL pushes return address (a) -> Callee prologue pushes previous base pointer (d) -> Sub esp allocates local variables (c).'
  },
  {
    id: 78,
    week: 8,
    weekTitle: 'Week 8',
    topic: 'Buffer Overflow Vulnerability Patterns',
    question: 'To ensure source code has minimal buffer overflow vulnerabilities, which unsafe coding patterns must be audited and avoided?',
    options: [
      { id: 'a', text: 'printf and scanf format string mishandling' },
      { id: 'b', text: 'Unbounded gets() function in code' },
      { id: 'c', text: 'Loops manipulating arrays without boundary checks' },
      { id: 'd', text: 'All of the above' }
    ],
    correctOptionId: 'd',
    explanation: 'All of the above. gets() never checks buffer limits, improperly formatted printf/scanf allows format string exploits, and unbounded array loops cause stack/heap buffer overflows.'
  },
  {
    id: 79,
    week: 8,
    weekTitle: 'Week 8',
    topic: 'Runtime Detection of ROP Attacks',
    question: 'A Return-Oriented Programming (ROP) attack can potentially be detected at runtime by monitoring:',
    options: [
      { id: 'a', text: 'Pseudo-random number verification after start of function' },
      { id: 'b', text: 'The number of return statements present in static binary executable' },
      { id: 'c', text: 'The frequency and number of return statements executed in the processor' },
      { id: 'd', text: 'Enforcing a non-executable stack alone' }
    ],
    correctOptionId: 'c',
    explanation: 'ROP attacks chain together short instruction gadgets that each end with a RET instruction. A suspicious spike in rapidly executed return instructions indicates gadget traversal.'
  },
  {
    id: 80,
    week: 8,
    weekTitle: 'Week 8',
    topic: 'Address Space Layout Randomization (ASLR)',
    question: 'State True or False:\nASLR randomizes the position of all variables in the stack and thereby completely eliminates buffer overflows.',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'True on 64-bit Linux' },
      { id: 'd', text: 'True if stack canary is disabled' }
    ],
    correctOptionId: 'b',
    explanation: 'False. ASLR randomizes the base addresses of memory segments (stack base, heap, shared libraries), not each individual variable inside a frame. Furthermore, it does not prevent buffer overflows; it only makes address prediction harder for attackers.'
  }
];
