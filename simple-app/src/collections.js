function printLine() {
    console.log("─".repeat(80))
}

// 1. Array (Lista Genérica, Pilha e Fila)
const languages = [
    { id: 1, nome: 'C#', paradigma: 'misto' },
    { id: 2, nome: 'JavaScript', paradigma: 'misto' },
    { id: 3, nome: 'Haskell', paradigma: 'funcional' },
    { id: 4, nome: 'Java', paradigma: 'POO' },
    { id: 5, nome: 'C', paradigma: 'procedural' },
    { id: 6, nome: 'Python', paradigma: 'misto' },
    { id: 7, nome: 'Ruby', paradigma: 'POO' },
    { id: 8, nome: 'Elixir', paradigma: 'funcional' },
    { id: 9, nome: 'Smalltalk', paradigma: 'poo' },
    { id: 10, nome: 'Go', paradigma: 'misto' }
];
console.log("Initial state")
console.table(languages);

const primeiro = languages[0];               // Get by Index
const busca = languages.find(o => o.nome === "JavaScript"); // Get by Attribute (como FirstOrDefault)

console.log("First item")
console.table(primeiro)
console.log("Finded item")
console.table(busca)

printLine()

// 2. Clonar e manipular lista
new_languages = [...languages]; // Shallow Copy → Equivalente a Array.from(original)
new_languages.push({ id: 30, nome: 'JS', paradigma: 'misto' });       // Add no fim
new_languages.splice(1, 1);                      // Remove 1 item no índice 1 - Remove item "JavaScript" e incluir "JS"

console.log("Removed 'JavaScript', and added 'JS' on new variable 'new_languages'");
console.table(new_languages);
printLine()

// 3. Map (Hash Map / Dicionário) - Ideal para acesso O(1)
const cache = new Map();
cache.set('key1', { info: 'dados' });    // Add
const item = cache.get('key1');          // Get by Key

const invalid_key = cache.get('invalid_key'); // Return "undefined"

console.log("key1");
console.table(cache);

console.log("invalid_key: " + invalid_key);

printLine()

// 4. Operações no array

// Filtrar paradigma "poo" (case insensitive)
const onlyPoo = languages.filter(lang =>
    lang.paradigma.toLowerCase() === 'poo'
);

// Map para transformar estrutura de dados
const transformedList = languages.map(lang => ({
    id: lang.id,
    nome: lang.nome,
    frase: `A linguagem ${lang.nome} possui o paradigma ${lang.paradigma}`
}));

// Agregar informações
const groupedByParadigma = Object.groupBy(languages, lang => lang.paradigma.toLowerCase());

// Object.entries() → Transoforma dictionary em array multi-dimensional
// .map() → Transforma array (item 0 = paradigma, item 1 = objeto completo) em um novo dicionário, onde key continua sendo o paradigma, e o valor é array de languages
const groupedByParadigmaWithStringArrayValue = Object.fromEntries(
    Object.entries(groupedByParadigma).map(([paradigma, lista]) => [
        paradigma,
        lista.map(l => l.nome.toUpperCase()) // Aqui modificamos a estrutura interna
    ])
);

// Com reduce - num mesmo loop agrega e transforma. Mais performance, mas pior legibilidade. 
// O desempenho extra é irrelevante pra maior parte dos casos de uso de CRUDs.
const reducedByParadigmaWithStringArrayValue = languages.reduce((acc, lang) => {
    const p = lang.paradigma.toLowerCase();

    // Se a "gaveta" não existe, criamos uma lista vazia
    if (!acc[p]) 
        acc[p] = [];

    // Adicionamos apenas o que nos interessa (transformação)
    acc[p].push(lang.nome.toUpperCase());

    return acc;
}, {}); // O {} é o "seed" ou valor inicial


console.log("Only POO languages")
console.table(onlyPoo)

console.log("Transformed object")
console.table(transformedList)

console.log("Grouped by paradigma")
console.table(groupedByParadigma)

console.log("Grouped by paradigma - 'poo' key")
console.table(groupedByParadigma["poo"])

console.log("Grouped by paradigma with string array value")
console.table(groupedByParadigmaWithStringArrayValue)

console.log("Reduced by paradigma with string array value")
console.table(reducedByParadigmaWithStringArrayValue)