export const profileGradients = [
	'https://plus.unsplash.com/premium_photo-1664443577580-dd2674e9d359?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JhZGllbnR8ZW58MHx8MHx8fDA%3D',
	'https://images.unsplash.com/photo-1604079628040-94301bb21b91?q=80&w=2731&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'https://plus.unsplash.com/premium_photo-1664443577598-cb50602ee207?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z3JhaW55JTIwZ3JhZGllbnR8ZW58MHx8MHx8fDA%3D',
	'https://images.unsplash.com/photo-1711945344720-243fe94b6b99?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhaW55JTIwZ3JhZGllbnR8ZW58MHx8MHx8fDA%3D',
];

export const getARandomGradient = () => profileGradients[Math.floor(Math.random() * profileGradients.length)];
